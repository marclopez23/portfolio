// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Información básica del proyecto
    title: z.string(),
    heroImage: z.string(),
    logo: z.string().optional(),
    
    // Información del proyecto (3 columnas)
    objective: z.string(),
    role: z.string(), 
    duration: z.string(),
    team: z.string(),
    
    // Secciones del proyecto (flexibles)
    sections: z.array(z.object({
      title: z.string(),
      content: z.string(),
      image: z.string().optional(),
      video: z.string().optional(),
      layout: z.enum(['image-left', 'image-right', 'full-width', 'text-only']),
      backgroundColor: z.string().optional(), // Para secciones con fondo especial
    })),
    
    // Proyectos relacionados (opcional)
    relatedProjects: z.array(z.string()).optional(),
    
    // SEO y metadata
    description: z.string().optional(),
    publishDate: z.date().optional(),
    featured: z.boolean().default(false),
    
    // Orden en el listado
    order: z.number().default(0),
  }),
});

export const collections = {
  projects: projectsCollection,
};