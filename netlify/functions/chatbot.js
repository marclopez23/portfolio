// netlify/functions/chatbot.js

// Datos reales del portfolio de Marc Lopez
const portfolio = {
  "bio": {
    "es": "Soy Marc, Product Designer con experiencia en la creación y gestión de productos digitales complejos, siempre con un enfoque en la colaboración y la mejora continua.\n\nMe apasiona diseñar experiencias claras y útiles, pero también explorar nuevas formas de trabajo: dinámicas, procesos y herramientas que impulsen a los equipos a ser más eficientes y creativos.\n\nTrabajo junto con equipos de research, data, negocio y tecnología, lo que me permite abordar los proyectos con una visión integral. Además, mis conocimientos en desarrollo web me ayudan a comprender mejor las limitaciones y oportunidades técnicas, y a colaborar de forma más fluida con los equipos de desarrollo.\n\nA lo largo de mi trayectoria he diseñado y gestionado sistemas de diseño, no solo como soporte de consistencia visual, sino como una herramienta estratégica para escalar productos y mejorar la comunicación entre diseño y desarrollo.\n\nMás allá del diseño, disfruto con la gestión de proyectos, la mentoría a diseñadores junior y la organización de la capacidad del equipo, asegurando que trabajemos de forma óptima y con impacto.\n\nFuera del trabajo, me encontrarás haciendo deporte, jugando a videojuegos o explorando lo último en tecnología."
  },
  "experiencia_actual": {
    "title": "Senior Product Designer",
    "company": "Banc Sabadell",
    "period": "Mayo 2024 - Presente",
    "tasks": [
      "Diseño y optimización de flujos para Desktop y App en el equipo de empresas",
      "Gestión de mejoras y nuevos componentes con el equipo de Sistema de Diseño",
      "Soporte a equipos externos en fases de diseño y validación",
      "Colaboración con Research en ideación, investigación y testeo",
      "Mentoría a diseñador junior y formación en diseño y sistemas de diseño"
    ]
  },
  "experiencia_destacada": [
    {
      "title": "Design System Lead",
      "company": "Sistema de Salut de Catalunya",
      "period": "Dic. 2023 - May. 2024",
      "description": "Liderazgo en la creación y evolución del sistema de diseño del sistema sanitario catalán"
    },
    {
      "title": "Product Designer / Design System Designer",
      "company": "ALEA Design",
      "period": "Dic. 2022 - Dic 2023",
      "description": "Diseño de productos para startups y empresas tecnológicas en Arabia Saudita"
    },
    {
      "title": "UX Product Designer / System Designer",
      "company": "Crealogix AG",
      "period": "Oct. 2020 - Nov. 2022",
      "description": "Diseño de productos fintech para clientes en Oriente Medio, Europa y Asia"
    }
  ],
  "formacion": [
    {
      "title": "Curso de especialización en Diseño y Datos",
      "company": "Mr Marcel School",
      "period": "Sep. 2024 - Oct. 2024"
    },
    {
      "title": "Máster en Diseño y Dirección de Proyectos para Internet",
      "company": "Elisava",
      "period": "Sep. 2019 - Jul. 2020"
    },
    {
      "title": "Full Stack Web Developer Program",
      "company": "Ironhack",
      "period": "Sep. 2020 - Abr. 2021"
    }
  ],
  "skills": [
    "Sistemas de diseño",
    "Sector bancario",
    "Accesibilidad web",
    "Front-End Development",
    "Mentoría",
    "Gestión de proyectos",
    "Design Tokens",
    "Diseño UI",
    "Diseño de apps",
    "Gestión de equipos"
  ]
};

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
    if (!process.env.GROQ_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'GROQ_API_KEY no configurada' })
      };
    }

    // Obtener pregunta
    let question;
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body || '{}');
      question = body.question;
    } else {
      question = event.queryStringParameters?.question || 'Hola';
    }

    if (!question) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Pregunta requerida' })
      };
    }

    const contexto = JSON.stringify(portfolio, null, 2);

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
            content: `Eres un asistente virtual profesional de Marc Lopez, Product Designer especializado en sistemas de diseño y productos digitales.

INFORMACIÓN DE MARC LOPEZ:
${contexto}

INSTRUCCIONES:
- Responde en español de forma natural y profesional
- Usa solo la información proporcionada
- Sé conciso pero informativo (máximo 3-4 frases)
- Si no tienes información específica, dilo claramente
- Enfócate en su experiencia actual en Banc Sabadell y sus especialidades en design systems
- Destaca su experiencia en fintech, banking y liderazgo de equipos`
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

    if (!result.choices?.[0]?.message) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Formato de respuesta inesperado' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        answer: result.choices[0].message.content.trim(),
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