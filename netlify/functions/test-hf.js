// netlify/functions/test-hf.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Añadir headers CORS para evitar problemas
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Manejar preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    console.log('Iniciando prueba de conexión con Hugging Face...');
    
    // Verificar que existe la API key
    if (!process.env.HF_API_KEY) {
      console.error('HF_API_KEY no está configurada');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'HF_API_KEY no configurada en las variables de entorno' 
        })
      };
    }

    console.log('API Key encontrada, haciendo petición...');

    const response = await fetch(
      "https://api-inference.huggingface.co/models/gpt2",
      {
        headers: { 
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ 
          inputs: "Say hello in Spanish",
          parameters: {
            max_new_tokens: 50,
            temperature: 0.7
          }
        })
      }
    );

    console.log('Respuesta recibida, status:', response.status);

    const result = await response.json();
    console.log('Resultado:', result);

    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify({
        success: response.ok,
        status: response.status,
        result: result,
        message: response.ok ? 'Conexión exitosa!' : 'Error en la conexión'
      })
    };

  } catch (error) {
    console.error('Error en test-hf:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Error interno del servidor',
        message: error.message,
        stack: error.stack
      })
    };
  }
};