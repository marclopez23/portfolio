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
    console.log('=== DIAGNÓSTICO COMPLETO ===');
    
    const apiKey = process.env.HF_API_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'HF_API_KEY no configurada' })
      };
    }

    // Información detallada del token
    const tokenAnalysis = {
      exists: !!apiKey,
      length: apiKey.length,
      startsCorrectly: apiKey.startsWith('hf_'),
      endsCorrectly: /^hf_[A-Za-z0-9]{34}$/.test(apiKey),
      hasSpecialChars: /[^A-Za-z0-9_]/.test(apiKey),
      first15: apiKey.substring(0, 15),
      last15: apiKey.substring(apiKey.length - 15),
      middle: apiKey.substring(15, 22)
    };

    console.log('Token analysis:', tokenAnalysis);

    // Test 1: Verificar con diferentes métodos
    const tests = [];

    // Test A: Endpoint básico de usuario
    try {
      console.log('Test A: whoami endpoint');
      const whoamiResponse = await fetch('https://huggingface.co/api/whoami', {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'Netlify-Function/1.0'
        }
      });
      
      const whoamiText = await whoamiResponse.text();
      console.log('Whoami result:', whoamiResponse.status, whoamiText);
      
      tests.push({
        name: 'whoami',
        status: whoamiResponse.status,
        success: whoamiResponse.ok,
        response: whoamiText
      });
    } catch (error) {
      tests.push({
        name: 'whoami',
        error: error.message
      });
    }

    // Test B: Probar con diferentes modelos
    const modelsToTest = [
      'gpt2',
      'distilbert-base-uncased',
      'bert-base-uncased'
    ];

    for (const model of modelsToTest) {
      try {
        console.log(`Test B: model ${model}`);
        
        const modelResponse = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'User-Agent': 'Netlify-Function/1.0'
          },
          body: JSON.stringify({
            inputs: 'test',
            parameters: model === 'gpt2' ? { max_new_tokens: 5 } : {}
          })
        });

        const modelText = await modelResponse.text();
        console.log(`Model ${model} result:`, modelResponse.status, modelText.substring(0, 200));
        
        tests.push({
          name: `model-${model}`,
          status: modelResponse.status,
          success: modelResponse.ok,
          response: modelText.substring(0, 500)
        });

        // Si uno funciona, no necesitamos probar más
        if (modelResponse.ok) {
          console.log(`✅ Model ${model} works!`);
          break;
        }
        
      } catch (error) {
        tests.push({
          name: `model-${model}`,
          error: error.message
        });
      }
    }

    // Test C: Verificar si es un problema de headers
    try {
      console.log('Test C: Different header format');
      const altResponse = await fetch('https://api-inference.huggingface.co/models/gpt2', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: 'Hello' })
      });

      const altText = await altResponse.text();
      
      tests.push({
        name: 'alternative-headers',
        status: altResponse.status,
        success: altResponse.ok,
        response: altText.substring(0, 500)
      });
      
    } catch (error) {
      tests.push({
        name: 'alternative-headers',
        error: error.message
      });
    }

    // Análisis de resultados
    const workingTest = tests.find(t => t.success);
    const analysis = {
      totalTests: tests.length,
      successfulTests: tests.filter(t => t.success).length,
      commonErrors: [...new Set(tests.filter(t => !t.success).map(t => t.status || 'network_error'))],
      hasWorkingTest: !!workingTest
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        tokenAnalysis,
        tests,
        analysis,
        recommendation: workingTest ? 
          `✅ El token funciona con: ${workingTest.name}` :
          '❌ El token no funciona con ningún endpoint. Posible token inválido o problema de permisos.',
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Error general:', error);
    
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