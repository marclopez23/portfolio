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
    const apiKey = process.env.HF_API_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'HF_API_KEY no configurada' })
      };
    }

    console.log('Testing HF token...');
    console.log('Token length:', apiKey.length);
    console.log('Token start:', apiKey.substring(0, 10));
    console.log('Token end:', apiKey.substring(apiKey.length - 10));

    // Test simple con gpt2
    const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: 'Hello world',
        parameters: { max_new_tokens: 10 }
      })
    });

    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Response text:', responseText);

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      result = { unparseable: responseText };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: response.ok,
        status: response.status,
        tokenInfo: {
          length: apiKey.length,
          startsWithHf: apiKey.startsWith('hf_'),
          first10: apiKey.substring(0, 10),
          last10: apiKey.substring(apiKey.length - 10)
        },
        result: result,
        message: response.ok ? 
          '✅ Token funciona correctamente!' : 
          `❌ Error ${response.status}: ${responseText}`,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Error:', error);
    
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