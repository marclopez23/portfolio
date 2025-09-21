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

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método no permitido' })
    };
  }

  try {
    if (!process.env.HF_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'HF_API_KEY no configurada' })
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

    const { question } = JSON.parse(event.body || '{}');

    if (!question) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Pregunta requerida' })
      };
    }

    const contexto = JSON.stringify(portfolio, null, 2);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
      {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: `Eres un asistente que responde preguntas sobre Marc Lopez basándote en su portfolio.

INFORMACIÓN DEL PORTFOLIO:
${contexto}

PREGUNTA: ${question}

Responde de forma natural y profesional usando solo la información proporcionada.`,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.7,
            return_full_text: false
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
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

    if (!result || !Array.isArray(result) || !result[0] || !result[0].generated_text) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Formato de respuesta inesperado'
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        answer: result[0].generated_text.trim(),
        success: true
      })
    };

  } catch (error) {
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