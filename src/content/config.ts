import { defineCollection, z } from 'astro:content'

const pages = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
  }),
})

const projets = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    duration: z.string().optional(),
    company: z.string().optional(),
    location: z.string().optional(),
    skills: z.array(z.string()).optional(),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })).optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    date: z.string(),
    draft: z.boolean().default(false).optional(),
    lang: z.string().default('en-US').optional(),
    tag: z.string().optional().optional(),
    redirect: z.string().optional(),
    video: z.boolean().default(false).optional(),
  }),
})

export const collections = { pages, projets }
