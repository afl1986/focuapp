import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

export const blockRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.block.create({
        data: {
          title: 'test',
          createdBy: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      })
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.block.findFirst({
      orderBy: { createdAt: 'desc' },
      where: { createdBy: { id: ctx.session.user.id } },
    })
  }),
})
