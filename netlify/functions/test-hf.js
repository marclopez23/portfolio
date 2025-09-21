// netlify/functions/simple-test.js
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const apiKey = process.env.HF_API_KEY;
  
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Token no configurado en variables de entorno',
        timestamp: new Date().toISOString()
      })
    };
  }

  try {
    console.log('Testing alternative HF model...');
    
    const response = await fetch('https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        inputs: "Hello world"
      })
    });

    const resultText = await response.text();
    console.log('API Response:', response.status, resultText.substring(0, 100));
    
    let parsedResult;
    try {
      parsedResult = JSON.parse(resultText);
    } catch (parseError) {
      parsedResult = { raw: resultText };
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: response.ok,
        status: response.status,
        tokenConfigured: true,
        tokenLength: apiKey.length,
        model: 'sentence-transformers/all-MiniLM-L6-v2',
        apiResponse: parsedResult,
        message: response.ok ? 
          'API de Hugging Face funciona con modelo alternativo' : 
          `Error ${response.status} en la API`,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Error in function:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Error interno de la función',
        message: error.message,
        tokenConfigured: !!apiKey,
        timestamp: new Date().toISOString()
      })
    };
  }
};