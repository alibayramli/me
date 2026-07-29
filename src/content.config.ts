import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.md',
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        description: z.string().min(1),
        publishDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        draft: z.boolean().default(false),
        tags: z.array(z.string().min(1)).default([]),
        cover: image().optional(),
        coverAlt: z.string().min(1).optional(),
      })
      .superRefine((post, context) => {
        if (post.cover && !post.coverAlt) {
          context.addIssue({
            code: 'custom',
            message: 'coverAlt is required when cover is set.',
            path: ['coverAlt'],
          })
        }
      }),
})

export const collections = { blog }
