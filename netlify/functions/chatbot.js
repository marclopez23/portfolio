// netlify/functions/chatbot.js
const fetch = require('node-fetch');
const portfolio = require('../../src/data/portfolio.json');

exports.handler = async (event, context) => {
  // Headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Manejar preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Solo permitir POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método no permitido. Usa POST.' })
    };
  }

  try {
    console.log('Iniciando chatbot...');

    // Verificar API key
    if (!process.env.HF_API_KEY) {
      console.error('HF_API_KEY no configurada');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'HF_API_KEY no configurada' })
      };
    }

    // Parsear el body
    let body;
    try {
      body = JSON.parse(event.body || '{}');
    } catch (parseError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'JSON inválido en el body' })
      };
    }

    const { question } = body;

    if (!question || question.trim() === '') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Pregunta requerida' })
      };
    }

    console.log('Pregunta recibida:', question);

    const contexto = JSON.stringify(portfolio, null, 2);

    console.log('Enviando petición a Hugging Face...');

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        headers: { 
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          inputs: `Eres un asistente que responde preguntas sobre Marc Lopez basándote en su portfolio. 

INFORMACIÓN DEL PORTFOLIO:
${contexto}

PREGUNTA: ${question}

Responde de forma natural y útil usando solo la información proporcionada. Si no tienes información suficiente, dilo claramente.`,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.7,
            return_full_text: false,
            do_sample: true
          }
        })
      }
    );

    console.log('Respuesta de HF recibida, status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error de Hugging Face:', errorText);
      
      // Si el modelo está cargando, devolver mensaje amigable
      if (response.status === 503) {
        return {
          statusCode: 503,
          headers,
          body: JSON.stringify({ 
            error: 'El modelo de IA se está cargando. Intenta de nuevo en unos segundos.',
            retryAfter: 30
          })
        };
      }
      
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          error: 'Error del servicio de IA',
          details: errorText
        })
      };
    }

    const result = await response.json();
    console.log('Resultado procesado');

    // Verificar formato de respuesta
    if (!result || !Array.isArray(result) || !result[0] || !result[0].generated_text) {
      console.error('Formato inesperado:', result);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Formato de respuesta inesperado del modelo de IA'
        })
      };
    }

    const answer = result[0].generated_text.trim();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        answer: answer,
        success: true
      })
    };

  } catch (error) {
    console.error('Error en chatbot:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Error interno del servidor',
        message: error.message
      })
    };
  }
};