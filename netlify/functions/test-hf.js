// netlify/functions/test-groq.js
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Aceptar tanto GET como POST para facilitar testing desde navegador

  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'GROQ_API_KEY no configurada',
        timestamp: new Date().toISOString()
      })
    };
  }

  try {
    console.log('Testing Groq API...');
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'user',
            content: 'Say hello in Spanish'
          }
        ],
        max_tokens: 50
      })
    });

    const resultText = await response.text();
    console.log('Groq Response:', response.status, resultText.substring(0, 200));
    
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
        model: 'llama-3.1-8b-instant',
        apiResponse: parsedResult,
        message: response.ok ? 
          'Groq API funciona correctamente' : 
          `Error ${response.status} en Groq`,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Error in Groq test:', error);
    
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