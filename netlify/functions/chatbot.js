// netlify/functions/chatbot.js

// Datos completos del portfolio de Marc Lopez (ES + EN)
const portfolio = {
  "bio": {
    "en": "I'm Marc, a Product Designer with experience in the creation and management of complex digital products, always with a focus on collaboration and continuous improvement.\n\nI'm passionate about designing clear and useful experiences, but also about exploring new ways of working: dynamics, processes, and tools that make teams more efficient and creative.\n\nI work closely with research, data, business, and technology teams, which allows me to approach projects with a comprehensive vision. In addition, my knowledge of web development helps me better understand technical limitations and opportunities, and collaborate more smoothly with development teams.\n\nThroughout my career I have designed and managed design systems, not only as a support for visual consistency, but also as a strategic tool to scale products and improve communication between design and development.\n\nBeyond design, I enjoy project management, mentoring junior designers, and team capacity planning, ensuring that we work in an optimal and impactful way.\n\nOutside of work, you'll find me playing sports, gaming, or exploring the latest in technology.",
    "es": "Soy Marc, Product Designer con experiencia en la creación y gestión de productos digitales complejos, siempre con un enfoque en la colaboración y la mejora continua.\n\nMe apasiona diseñar experiencias claras y útiles, pero también explorar nuevas formas de trabajo: dinámicas, procesos y herramientas que impulsen a los equipos a ser más eficientes y creativos.\n\nTrabajo junto con equipos de research, data, negocio y tecnología, lo que me permite abordar los proyectos con una visión integral. Además, mis conocimientos en desarrollo web me ayudan a comprender mejor las limitaciones y oportunidades técnicas, y a colaborar de forma más fluida con los equipos de desarrollo.\n\nA lo largo de mi trayectoria he diseñado y gestionado sistemas de diseño, no solo como soporte de consistencia visual, sino como una herramienta estratégica para escalar productos y mejorar la comunicación entre diseño y desarrollo.\n\nMás allá del diseño, disfruto con la gestión de proyectos, la mentoría a diseñadores junior y la organización de la capacidad del equipo, asegurando que trabajemos de forma óptima y con impacto.\n\nFuera del trabajo, me encontrarás haciendo deporte, jugando a videojuegos o explorando lo último en tecnología."
  },
  "projects": {
    "es": [
      {
        "title": "SNB Retail App",
        "objective": "Rediseñar la aplicación de banca retail de SNB para Arabia Saudí",
        "role": "Product Designer y Design System Designer",
        "duration": "7 meses",
        "challenges": ["Productos financieros locales", "Diseño bilingüe (RTL y LTR)", "Coordinación internacional con +30 desarrolladores"],
        "url": "https://marclopezia.netlify.app/proyectos/saudi-national-bank"
      },
      {
        "title": "DH Design System",
        "objective": "Crear un Design System multiplataforma para todos los equipos de la compañía",
        "role": "Design System Designer",
        "duration": "6 meses",
        "challenges": ["Arquitectura de tokens escalable", "Unir diseño y desarrollo", "Conseguir presupuesto y recursos"],
        "url": "https://marclopezia.netlify.app/proyectos/dh-design-system"
      },
      {
        "title": "Bayn",
        "objective": "Plataforma financiera completa para gestión de grandes volúmenes de datos",
        "role": "Product Designer",
        "description": "Plataforma para dos segmentos: distribuidores y retailers, con eCommerce integrado",
        "challenges": ["Dos tipos de usuarios diferentes", "Creación de eCommerce integrado"],
        "url": "https://marclopezia.netlify.app/proyectos/bayn"
      },
      {
        "title": "DH Retail App",
        "objective": "App de banca retail moderna que compita con grandes bancos europeos",
        "role": "Product Designer",
        "description": "App white-label que rompe con la seriedad tradicional bancaria",
        "challenges": ["Tono visual más humano y accesible", "Flexibilidad de diseño para diferentes bancos"],
        "url": "https://marclopezia.netlify.app/proyectos/dh-retail-app"
      },
      {
        "title": "Aljuf Finance",
        "objective": "Digitalización completa de procesos de financiación para PYMES",
        "role": "Product Designer",
        "description": "Enfoque en leasing de automóviles y configuraciones complejas",
        "challenges": ["Flujo de leasing de coches con +25 modelos", "Configuraciones y simulaciones en tiempo real"],
        "url": "https://marclopezia.netlify.app/proyectos/aljuf-finance"
      }
    ],
    "en": [
      {
        "title": "SNB Retail App",
        "objective": "Redesign the SNB retail banking app for Saudi Arabian market",
        "role": "Product Designer and Design System Designer",
        "duration": "7 months",
        "challenges": ["Local financial products", "Bilingual design (RTL and LTR)", "International coordination with +30 developers"],
        "url": "https://marclopezia.netlify.app/en/projects/saudi-national-bank"
      },
      {
        "title": "DH Design System",
        "objective": "Create a cross-platform design system for all company teams",
        "role": "Design System Designer",
        "duration": "6 months",
        "challenges": ["Scalable token architecture", "Aligning design and development", "Securing budget and resources"],
        "url": "https://marclopezia.netlify.app/en/projects/dh-design-system"
      },
      {
        "title": "Bayn",
        "objective": "Comprehensive financial platform for managing large volumes of data",
        "role": "Product Designer",
        "description": "Platform for two segments: distributors and retailers, with integrated eCommerce",
        "challenges": ["Two different user types", "Creating integrated eCommerce"],
        "url": "https://marclopezia.netlify.app/en/projects/bayn"
      },
      {
        "title": "DH Retail App",
        "objective": "Modern retail banking app that competes with major European banks",
        "role": "Product Designer",
        "description": "White-label app breaking away from traditional banking seriousness",
        "challenges": ["More human and accessible visual tone", "Design flexibility for different banks"],
        "url": "https://marclopezia.netlify.app/en/projects/dh-retail-app"
      },
      {
        "title": "Aljuf Finance",
        "objective": "Complete digitization of financing processes for SMEs",
        "role": "Product Designer",
        "description": "Focus on auto leasing and complex configurations",
        "challenges": ["Car leasing flow with +25 models", "Real-time configurations and simulations"],
        "url": "https://marclopezia.netlify.app/en/projects/aljuf-finance"
      }
    ]
  } SNB retail banking app for Saudi Arabian market",
        "role": "Product Designer and Design System Designer",
        "duration": "7 months",
        "challenges": ["Local financial products", "Bilingual design (RTL and LTR)", "International coordination with +30 developers"]
      },
      {
        "title": "DH Design System",
        "objective": "Create a cross-platform design system for all company teams",
        "role": "Design System Designer",
        "duration": "6 months",
        "challenges": ["Scalable token architecture", "Aligning design and development", "Securing budget and resources"]
      },
      {
        "title": "Bayn",
        "objective": "Comprehensive financial platform for managing large volumes of data",
        "role": "Product Designer",
        "description": "Platform for two segments: distributors and retailers, with integrated eCommerce",
        "challenges": ["Two different user types", "Creating integrated eCommerce"]
      },
      {
        "title": "DH Retail App",
        "objective": "Modern retail banking app that competes with major European banks",
        "role": "Product Designer",
        "description": "White-label app breaking away from traditional banking seriousness",
        "challenges": ["More human and accessible visual tone", "Design flexibility for different banks"]
      },
      {
        "title": "Aljuf Finance",
        "objective": "Complete digitization of financing processes for SMEs",
        "role": "Product Designer",
        "description": "Focus on auto leasing and complex configurations",
        "challenges": ["Car leasing flow with +25 models", "Real-time configurations and simulations"]
      }
    ]
  },
  "current_position": {
    "es": {
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
    "en": {
      "title": "Senior Product Designer",
      "company": "Banc Sabadell",
      "period": "May 2024 - Present",
      "tasks": [
        "Design and optimization of flows for Desktop and App within the business team",
        "Management of improvements and new components with the Design System team",
        "Support for external teams during design and validation phases",
        "Collaboration with Research in ideation, user research, and testing",
        "Mentoring a junior designer and providing training in design and design systems"
      ]
    }
  },
  "experience": {
    "es": [
      {
        "title": "Senior Product Designer",
        "company": "Banc Sabadell",
        "period": "Mayo 2024 - Presente",
        "type": "work",
        "tasks": [
          "Diseño y optimización de flujos para Desktop y App en el equipo de empresas",
          "Gestión de mejoras y nuevos componentes con el equipo de Sistema de Diseño",
          "Soporte a equipos externos en fases de diseño y validación",
          "Colaboración con Research en ideación, investigación y testeo",
          "Mentoría a diseñador junior y formación en diseño y sistemas de diseño"
        ],
        "featured": true,
        "current": true
      },
      {
        "title": "Design System Lead",
        "company": "Sistema de Salut de Catalunya",
        "period": "Dic. 2023 - May. 2024",
        "type": "work",
        "tasks": [
          "Liderazgo del desarrollo y mantenimiento del sistema de diseño",
          "Gestión del equipo del sistema de diseño",
          "Colaboración con equipos multidisciplinarios para la adopción efectiva del sistema",
          "Definición y aplicación de estándares de diseño, componentes y pautas",
          "Mentorización a otros diseñadores del equipo"
        ],
        "featured": true
      },
      {
        "title": "Product Designer / Design System Designer",
        "company": "ALEA Design",
        "period": "Dic. 2022 - Dic 2023",
        "type": "work",
        "tasks": [
          "Diseño de productos para startups y empresas tecnológicas en Arabia Saudita",
          "Gestión y soporte de entrega a equipos de desarrollo",
          "Creación de sistemas de diseño para diferentes clientes"
        ],
        "featured": true
      },
      {
        "title": "UX Product Designer / System Designer",
        "company": "Crealogix AG",
        "period": "Oct. 2020 - Nov. 2022",
        "type": "work",
        "tasks": [
          "Diseño de productos fintech para clientes en Oriente Medio, Europa y Asia",
          "Contribución a la creación y mantenimiento del sistema de diseño de la empresa",
          "Participación en el rediseño de la aplicación de uno de los bancos más grandes de Oriente Medio"
        ],
        "featured": true
      },
      {
        "title": "Diseñador web",
        "company": "Strategycomm",
        "period": "Feb. 2018 - Set. 2020",
        "type": "work",
        "tasks": [
          "Gestión y diseño de newsletters con Mailchimp",
          "Diseño UI (Sketch, Figma)",
          "Maquetación y mantenimiento web en Wordpress"
        ]
      },
      {
        "title": "Diseñador web y técnico en posicionamiento SEO",
        "company": "Webbing Barcelona",
        "period": "Mar. 2017 - Ene. 2018",
        "type": "work",
        "tasks": [
          "Optimización SEO (on page y off page)",
          "Maquetación web en Wordpress",
          "Mantenimiento y actualización de webs (Wordpress, Joomla)"
        ]
      }
    ],
    "en": [
      {
        "title": "Senior Product Designer",
        "company": "Banc Sabadell",
        "period": "May 2024 - Present",
        "type": "work",
        "tasks": [
          "Design and optimization of flows for Desktop and App within the business team",
          "Management of improvements and new components with the Design System team",
          "Support for external teams during design and validation phases",
          "Collaboration with Research in ideation, user research, and testing",
          "Mentoring a junior designer and providing training in design and design systems"
        ],
        "featured": true,
        "current": true
      },
      {
        "title": "Design System Lead",
        "company": "Sistema de Salut de Catalunya",
        "period": "Dec. 2023 - May 2024",
        "type": "work",
        "tasks": [
          "Led the development and maintenance of the design system",
          "Managed the design system team",
          "Collaborated with multidisciplinary teams to ensure effective adoption of the system",
          "Defined and applied design standards, components, and guidelines",
          "Mentored other designers within the team"
        ],
        "featured": true
      },
      {
        "title": "Product Designer / Design System Designer",
        "company": "ALEA Design",
        "period": "Dec. 2022 - Dec. 2023",
        "type": "work",
        "tasks": [
          "Product design for startups and tech companies in Saudi Arabia",
          "Management and delivery support for development teams",
          "Creation of design systems for different clients"
        ],
        "featured": true
      },
      {
        "title": "UX Product Designer / System Designer",
        "company": "Crealogix AG",
        "period": "Oct. 2020 - Nov. 2022",
        "type": "work",
        "tasks": [
          "Fintech product design for clients in the Middle East, Europe, and Asia",
          "Contributed to the creation and maintenance of the company's design system",
          "Participated in the redesign of the application of one of the largest banks in the Middle East"
        ],
        "featured": true
      },
      {
        "title": "Web Designer",
        "company": "Strategycomm",
        "period": "Feb. 2018 - Sep. 2020",
        "type": "work",
        "tasks": [
          "Management and design of newsletters with Mailchimp",
          "UI design (Sketch, Figma)",
          "Web layout and maintenance in WordPress"
        ]
      },
      {
        "title": "Web Designer and SEO Specialist",
        "company": "Webbing Barcelona",
        "period": "Mar. 2017 - Jan. 2018",
        "type": "work",
        "tasks": [
          "SEO optimization (on-page and off-page)",
          "Web layout in WordPress",
          "Website maintenance and updates (WordPress, Joomla)"
        ]
      }
    ]
  },
  "education": {
    "es": [
      {
        "title": "Curso de especialización en Diseño y Datos",
        "company": "Mr Marcel School",
        "period": "Sep. 2024 - Oct. 2024",
        "type": "education",
        "tasks": [
          "Especialización en el uso de datos para informar decisiones de diseño",
          "Análisis de métricas de producto y experiencia de usuario",
          "Metodologías para testing y validación basada en datos",
          "Herramientas de analytics y research cuantitativo"
        ],
        "featured": true
      },
      {
        "title": "Accessible Technology Design",
        "company": "AccessibleEU Centre",
        "period": "Dic. 2023 - Dic. 2023",
        "type": "education",
        "tasks": [
          "Curso sobre los conceptos básicos para crear soluciones digitales inclusivas, abarcando principios, requisitos legales y estrategias de diseño para la accesibilidad"
        ]
      },
      {
        "title": "Curso de especialización en Design OPS",
        "company": "UXER School",
        "period": "May. 2023 - May. 2023",
        "type": "education",
        "tasks": [
          "Curso de especialización en Design Ops donde profundice en herramientas y procesos para optimizar los flujos de trabajo entre equipos de diseño, producto y desarrollo"
        ],
        "featured": true
      },
      {
        "title": "Curso de especialización en Design Systems",
        "company": "Mr Marcel School",
        "period": "Oct. 2021 - Dic. 2021",
        "type": "education",
        "tasks": [
          "Definición de misión, visión, objetivos y modelos de gobierno para sistemas de diseño",
          "Creación y mantenimiento de arquitecturas de Design Tokens escalables",
          "Documentación de patrones visuales y funcionales para equipos multidisciplinares",
          "Planificación end-to-end: auditoría, implementación y mantenimiento del sistema"
        ],
        "featured": true
      },
      {
        "title": "Full Stack Web Developer Program",
        "company": "Ironhack",
        "period": "Sep. 2020 - Abr. 2021",
        "type": "education",
        "tasks": [
          "Front End: HTML | CSS | SCSS | Javascript (ES6) | React",
          "Back End: Express.JS | Node.JS | MongoDB | Axios"
        ],
        "featured": true
      },
      {
        "title": "Máster en Diseño y Dirección de Proyectos para Internet",
        "company": "Elisava",
        "period": "Sep. 2019 - Jul. 2020",
        "type": "education",
        "tasks": [
          "Diseño centrado en el usuario, UX research, wireframing, prototipado",
          "Estrategias de negocio",
          "Metodologías Agiles (Scrum)"
        ],
        "featured": true
      },
      {
        "title": "Grado en Medios Audiovisuales",
        "company": "Tecnocampus Mataró",
        "period": "Sep. 2015 - Jul. 2019",
        "type": "education",
        "tasks": [
          "Grado en medios audiovisuales donde estudie todo lo que tiene que ver con el mundo audiovisual. Decidí enfocar mi especialización hacia el diseño y la elaboración de proyectos interactivos, ya sean páginas web o audiovisuales interactivos"
        ]
      }
    ],
    "en": [
      {
        "title": "Specialization Course in Design and Data",
        "company": "Mr Marcel School",
        "period": "Sep. 2024 - Oct. 2024",
        "type": "education",
        "tasks": [
          "Specialization in the use of data to inform design decisions",
          "Analysis of product and user experience metrics",
          "Methodologies for testing and data-driven validation",
          "Tools for analytics and quantitative research"
        ],
        "featured": true
      },
      {
        "title": "Accessible Technology Design",
        "company": "AccessibleEU Centre",
        "period": "Dec. 2023 - Dec. 2023",
        "type": "education",
        "tasks": [
          "Course on the basic concepts for creating inclusive digital solutions, covering principles, legal requirements, and design strategies for accessibility"
        ]
      },
      {
        "title": "Specialization Course in Design Ops",
        "company": "UXER School",
        "period": "May 2023 - May 2023",
        "type": "education",
        "tasks": [
          "Specialization course in Design Ops focused on tools and processes to optimize workflows between design, product, and development teams"
        ],
        "featured": true
      },
      {
        "title": "Specialization Course in Design Systems",
        "company": "Mr Marcel School",
        "period": "Oct. 2021 - Dec. 2021",
        "type": "education",
        "tasks": [
          "Definition of mission, vision, objectives, and governance models for design systems",
          "Creation and maintenance of scalable Design Token architectures",
          "Documentation of visual and functional patterns for multidisciplinary teams",
          "End-to-end planning: auditing, implementation, and system maintenance"
        ],
        "featured": true
      },
      {
        "title": "Full Stack Web Developer Program",
        "company": "Ironhack",
        "period": "Sep. 2020 - Apr. 2021",
        "type": "education",
        "tasks": [
          "Front End: HTML | CSS | SCSS | JavaScript (ES6) | React",
          "Back End: Express.js | Node.js | MongoDB | Axios"
        ],
        "featured": true
      },
      {
        "title": "Master's in Design and Project Management for the Internet",
        "company": "Elisava",
        "period": "Sep. 2019 - Jul. 2020",
        "type": "education",
        "tasks": [
          "User-centered design, UX research, wireframing, prototyping",
          "Business strategies",
          "Agile methodologies (Scrum)"
        ],
        "featured": true
      },
      {
        "title": "Bachelor's Degree in Audiovisual Media",
        "company": "Tecnocampus Mataró",
        "period": "Sep. 2015 - Jul. 2019",
        "type": "education",
        "tasks": [
          "Bachelor's degree in audiovisual media where I studied everything related to the audiovisual field. I decided to focus my specialization on design and the development of interactive projects, such as websites or interactive audiovisuals"
        ]
      }
    ]
  },
  "skills": {
    "es": ["Sistemas de diseño", "Sector bancario", "Accesibilidad web", "Front-End Development", "Mentoría", "Gestión de proyectos", "Design Tokens", "Diseño UI", "Fintech"],
    "en": ["Design systems", "Banking sector", "Web accessibility", "Front-End Development", "Mentorship", "Project management", "Design Tokens", "UI design", "Fintech"]
  }
};

// Detectar idioma de la pregunta
function detectLanguage(text) {
  const englishWords = /\b(who|what|where|when|how|experience|design|work|skills|background|portfolio|company|project)\b/i;
  const spanishWords = /\b(quien|qué|donde|cuando|como|experiencia|diseño|trabajo|habilidades|empresa|proyecto|sobre)\b/i;
  
  if (englishWords.test(text) && !spanishWords.test(text)) {
    return 'en';
  }
  return 'es'; // Default español
}

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

    // Detectar idioma y preparar contexto
    const language = detectLanguage(question);
    const isEnglish = language === 'en';
    
    // Preparar contexto en el idioma detectado
    const contextData = {
      bio: portfolio.bio[language],
      current_position: portfolio.current_position[language],
      experience: portfolio.experience[language],
      education: portfolio.education[language],
      skills: portfolio.skills[language],
      projects: portfolio.projects[language]
    };

    const contexto = JSON.stringify(contextData, null, 2);

    const systemPrompt = isEnglish ? 
      `You are **Ellie**, Marc López's virtual assistant. He's a Senior Product Designer and you help present his professional experience to recruiters, hiring managers, and potential collaborators.

MARC'S INFORMATION:
${contexto}

YOUR COMMUNICATION STYLE:
- Professional and approachable: polite, direct, and transparent
- Don't oversell or exaggerate: present achievements and skills realistically
- Adaptable: respond based on what they ask (experience, education, projects, skills)
- Brief but complete: provide essential info without overwhelming, but offer details when needed

WHAT TO DO:
- Introduce yourself as Ellie, Marc's virtual assistant
- Experience questions → explain Marc's role and responsibilities concretely
- Skills questions → highlight main ones clearly
- Projects questions → mention relevant examples without confidential details
- Education questions → summarize key qualifications and courses
- Unrelated questions → politely explain you only share info about Marc's professional experience
- Always offer to expand on details or share additional examples

WHAT TO AVOID:
- Don't use excessive self-promotion ("the best", "visionary leader", etc.)
- Don't invent achievements not in his background
- Don't share personal info unrelated to professional work

Use line breaks to organize your responses clearly.` :
      `Eres **Ellie**, la asistente virtual de **Marc López**. Él es Senior Product Designer y ayudas a presentar su experiencia profesional a recruiters, hiring managers y potenciales colaboradores.

INFORMACIÓN DE MARC:
${contexto}

TU ESTILO DE COMUNICACIÓN:
- Profesional y cercano: educado, directo y transparente
- Sin exagerar ni vender humo: presenta logros y habilidades de forma realista
- Adaptable: responde según lo que pregunten (experiencia, educación, proyectos, habilidades)
- Breve pero completo: aporta información esencial sin abrumar, pero ofrece detalles cuando sea necesario

QUÉ HACER:
- Preséntate como Ellie, asistente virtual de Marc
- Preguntas de experiencia → explica el rol y responsabilidades de Marc de forma concreta
- Preguntas de habilidades → destaca las principales de manera clara
- Preguntas de proyectos → menciona ejemplos relevantes sin entrar en confidencialidad
- Preguntas de educación → resume titulaciones y cursos clave
- Preguntas no relacionadas → responde amablemente explicando que solo compartes info sobre experiencia profesional de Marc
- Siempre ofrece ampliar detalles o compartir ejemplos adicionales

QUÉ EVITAR:
- No uses frases de autopromoción exagerada ("el mejor", "líder visionario", etc.)
- No inventes logros o experiencias que no figuren en su trayectoria
- No compartas información personal no relacionada con lo profesional

Usa saltos de línea para organizar tus respuestas claramente.`;

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
            content: systemPrompt
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