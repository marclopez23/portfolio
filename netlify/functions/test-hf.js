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
    if (!process.env.HF_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'HF_API_KEY no configurada' })
      };
    }

    const apiKey = process.env.HF_API_KEY;
    
    // Verificar formato del token
    if (!apiKey.startsWith('hf_')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Token inválido - debe empezar con hf_',
          tokenStart: apiKey.substring(0, 5),
          tokenLength: apiKey.length
        })
      };
    }

    console.log('Testing with token:', apiKey.substring(0, 10) + '...');

    // Test 1: Verificar que el token existe con un endpoint básico
    console.log('🔍 Testing token validity...');
    
    const response = await fetch('https://huggingface.co/api/whoami', {
      headers: { 
        Authorization: `Bearer ${apiKey}`
      }
    });

    const whoAmIText = await response.text();
    console.log('WhoAmI response:', response.status, whoAmIText);

    let whoAmIResult;
    try {
      whoAmIResult = JSON.parse(whoAmIText);
    } catch (e) {
      whoAmIResult = { error: 'Could not parse response', raw: whoAmIText };
    }

    // Test 2: Probar Inference API con el modelo más básico
    console.log('🔍 Testing inference API...');
    
    const inferenceResponse = await fetch(
      'https://api-inference.huggingface.co/models/gpt2',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: 'Hello',
          parameters: {
            max_new_tokens: 10,
            return_full_text: false
          }
        })
      }
    );

    const inferenceText = await inferenceResponse.text();
    console.log('Inference response:', inferenceResponse.status, inferenceText);

    let inferenceResult;
    try {
      inferenceResult = JSON.parse(inferenceText);
    } catch (e) {
      inferenceResult = { 
        error: 'Could not parse inference response', 
        raw: inferenceText,
        status: inferenceResponse.status
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        tokenValidation: {
          format: apiKey.startsWith('hf_') ? 'valid' : 'invalid',
          length: apiKey.length,
          prefix: apiKey.substring(0, 5)
        },
        whoAmI: {
          status: response.status,
          success: response.ok,
          result: whoAmIResult
        },
        inference: {
          status: inferenceResponse.status,
          success: inferenceResponse.ok,
          result: inferenceResult
        },
        diagnosis: {
          tokenWorks: response.ok,
          inferenceWorks: inferenceResponse.ok,
          overallSuccess: response.ok && inferenceResponse.ok
        },
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Error interno',
        message: error.message,
        stack: error.stack
      })
    };
  }
};