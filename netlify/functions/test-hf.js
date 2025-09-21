// netlify/functions/test-hf.js
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    console.log('Testing Hugging Face connection...');

    if (!process.env.HF_API_KEY) {
      console.error('HF_API_KEY not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'HF_API_KEY no configurada' })
      };
    }

    console.log('API Key found, making request...');

    const response = await fetch(
      "https://api-inference.huggingface.co/models/gpt2",
      {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          inputs: "Say hello in Spanish",
          parameters: {
            max_new_tokens: 50,
            temperature: 0.7
          }
        })
      }
    );

    console.log('Response received, status:', response.status);

    const result = await response.json();
    console.log('Result:', result);

    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify({
        success: response.ok,
        status: response.status,
        result: result,
        message: response.ok ? '✅ Conexión exitosa con Hugging Face!' : '❌ Error en la conexión',
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Error in test-hf:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Error interno del servidor',
        message: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};