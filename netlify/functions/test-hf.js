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

  const results = [];

  try {
    console.log('=== TESTING HUGGING FACE MODELS ===');

    if (!process.env.HF_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'HF_API_KEY no configurada' })
      };
    }

    const apiKey = process.env.HF_API_KEY;
    console.log('✅ API Key found, length:', apiKey.length);

    // Lista de modelos para probar (de más simple a más complejo)
    const modelsToTest = [
      {
        name: "gpt2",
        url: "https://api-inference.huggingface.co/models/gpt2",
        payload: {
          inputs: "Hello",
          parameters: { max_new_tokens: 20 }
        }
      },
      {
        name: "distilbert-base-uncased",
        url: "https://api-inference.huggingface.co/models/distilbert-base-uncased",
        payload: {
          inputs: "Hello world"
        }
      },
      {
        name: "microsoft/DialoGPT-small",
        url: "https://api-inference.huggingface.co/models/microsoft/DialoGPT-small",
        payload: {
          inputs: "Hello",
          parameters: { max_length: 50 }
        }
      }
    ];

    // Probar cada modelo
    for (const model of modelsToTest) {
      try {
        console.log(`🔍 Testing model: ${model.name}`);
        
        const response = await fetch(model.url, {
          method: "POST",
          headers: { 
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(model.payload)
        });

        const responseText = await response.text();
        console.log(`📡 ${model.name} response:`, response.status, responseText.substring(0, 200));

        let result;
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          results.push({
            model: model.name,
            success: false,
            error: 'Invalid JSON response',
            rawResponse: responseText.substring(0, 500),
            status: response.status
          });
          continue;
        }

        results.push({
          model: model.name,
          success: response.ok && !result.error,
          status: response.status,
          result: result,
          error: result.error || null
        });

        // Si encontramos un modelo que funciona, podemos parar
        if (response.ok && !result.error) {
          console.log(`✅ Model ${model.name} works!`);
          break;
        }

      } catch (error) {
        console.error(`❌ Error with model ${model.name}:`, error);
        results.push({
          model: model.name,
          success: false,
          error: error.message,
          status: 'network_error'
        });
      }
    }

    // Verificar si algún modelo funcionó
    const workingModel = results.find(r => r.success);
    
    return {
      statusCode: workingModel ? 200 : 500,
      headers,
      body: JSON.stringify({
        success: !!workingModel,
        message: workingModel ? 
          `✅ Conexión exitosa! Modelo funcional: ${workingModel.model}` : 
          '❌ Ningún modelo funcionó',
        workingModel: workingModel?.model || null,
        apiKeyLength: apiKey.length,
        allResults: results,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('💥 Unexpected error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Error interno del servidor',
        message: error.message,
        results: results,
        timestamp: new Date().toISOString()
      })
    };
  }
};