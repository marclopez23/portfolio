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

export const collections = {
  projects: projectsCollection,
};