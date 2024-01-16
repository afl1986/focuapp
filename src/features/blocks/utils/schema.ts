import { z } from 'zod'

export const CreateBlockSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required.',
    })
    .max(70),
  description: z.string().optional(),
  date: z.date({
    required_error: 'A date ',
  }),
})
