// netlify/functions/chatbot.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Temporal: aceptar GET y POST para debugging
  if (event.httpMethod !== 'POST' && event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método no permitido' })
    };
  }

  try {
    if (!process.env.GROQ_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'GROQ_API_KEY no configurada' })
      };
    }

    // Leer el archivo portfolio.json real
    let portfolio;
    try {
      const portfolioPath = path.join(__dirname, '../../src/data/portfolio.json');
      const portfolioData = fs.readFileSync(portfolioPath, 'utf8');
      portfolio = JSON.parse(portfolioData);
    } catch (fileError) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Error cargando portfolio.json',
          details: fileError.message 
        })
      };
    }

    // Obtener la pregunta del body (POST) o query (GET para debugging)
    let question;
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body || '{}');
      question = body.question;
    } else {
      // GET para debugging
      question = event.queryStringParameters?.question || 'Hola, ¿quién es Marc Lopez?';
    }

    if (!question) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Pregunta requerida' })
      };
    }

    const contexto = JSON.stringify(portfolio, null, 2);

    console.log('Enviando petición a Groq...');

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: `Eres un asistente virtual profesional que responde preguntas sobre Marc Lopez basándote en su información de portfolio. 

INFORMACIÓN DE MARC LOPEZ:
${contexto}

Instrucciones:
- Responde de forma natural y profesional
- Usa solo la información proporcionada
- Si no tienes información específica, dilo claramente pero mantén un tono amigable
- Responde en español
- Sé conciso pero informativo
- Máximo 3-4 frases por respuesta`
          },
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    console.log('Respuesta de Groq recibida, status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error de Groq:', errorText);
      
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

    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      console.error('Formato inesperado:', result);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Formato de respuesta inesperado de Groq'
        })
      };
    }

    const answer = result.choices[0].message.content.trim();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        answer: answer,
        success: true,
        model: 'llama-3.1-8b-instant'
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