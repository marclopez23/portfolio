// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Información básica del proyecto (Hero)
    title: z.string(),
    heroImage: z.string(),
    logo: z.string().optional(),
    
    // Información del proyecto (3 columnas)
    objective: z.string(),
    role: z.string(), 
    duration: z.string(),
    team: z.string(),

    // Botón del proyecto
    buttonText: z.string().optional(), // Texto del botón
    buttonUrl: z.string().optional(),  // URL del botón
    
    // Proceso del proyecto (nueva sección)
    process: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string().optional(),
    }),
    
    // Retos del proyecto (secciones anidadas)
    challenges: z.object({
      title: z.string().default("Retos del proyecto"),
      items: z.array(z.object({
        title: z.string(),
        content: z.string(),
        image: z.string().optional(),
        video: z.string().optional(),
        layout: z.enum(['image-left', 'image-right', 'full-width', 'text-only']),
        backgroundColor: z.string().optional(),
      })),
    }),
    
    // Video del proyecto (opcional)
    projectVideo: z.string().optional(),
     videoThumbnail: z.string().optional(),
    
    // Proyectos relacionados (opcional)
    relatedProjects: z.array(z.string()).optional(),
    
    // SEO y metadata
    description: z.string().optional(),
    publishDate: z.date().optional(),
    featured: z.boolean().default(false),
    
    // Protección del proyecto
    protected: z.boolean().default(false),
    
    // Orden en el listado
    order: z.number().default(0),
  }),
});

// Colección para experiencia laboral y educativa
const experienceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Información básica
    title: z.string(), // Puesto/título de estudios
    company: z.string(), // Empresa/institución
    period: z.string(), // Fechas y ubicación
    
    // Tipo de experiencia
    type: z.enum(['work', 'education']),
    
    // Logo de la empresa (opcional)
    logo: z.string().optional(),
    logoAlt: z.string().optional(),
    
    // Lista de responsabilidades/logros/materias
    tasks: z.array(z.string()),
    
    // Información adicional (opcional)
    description: z.string().optional(), // Descripción general si necesitas más contexto
    website: z.string().optional(), // URL de la empresa/institución
    certificate: z.string().optional(),
    
    // Metadata
    featured: z.boolean().default(false), // Para destacar experiencias importantes
    current: z.boolean().default(false), // Si es la experiencia actual
    
    // Orden en el listado (más reciente = número menor)
    order: z.number().default(0),
    
    // Fechas estructuradas para ordenar
    startDate: z.date().optional(),
    endDate: z.date().optional(), // null si es actual
    
    // SEO
    keywords: z.array(z.string()).optional(), // Tecnologías, skills, etc.
  }),
});

export const collections = {
  projects: projectsCollection,
  experience: experienceCollection,
};