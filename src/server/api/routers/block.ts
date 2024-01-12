import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

export const blockRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ text: z.string().max(70) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.block.create({
        data: {
          title: input.text,
          createdBy: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      })
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.block.findMany({
      orderBy: { createdAt: 'desc' },
      where: { createdBy: { id: ctx.session.user.id } },
    })
  }),
})
