import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    icon: z.enum([
      'interior-design',
      '3d-visualization',
      'space-planning',
      'turnkey-execution',
      'interior-fit-out',
      'site-supervision',
      'renovation-remodeling',
      'engineering-design-consultation',
    ]),
    order: z.number(),
    features: z.array(z.string()),
  }),
});

export const collections = { services };
