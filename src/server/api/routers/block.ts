import { z } from 'zod'

import { CreateBlockSchema } from '@/features/blocks/utils/schema'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { getRepetitionSteps } from '@/shared/utils/replays'

export const blockRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateBlockSchema)
    .mutation(async ({ ctx, input }) => {
      const repetitions = getRepetitionSteps(input.date).map((_date) => ({
        done: false,
        replayDate: _date,
      }))
      console.log('🚀 ~ repetitions ~ repetitions:', repetitions)

      return ctx.db.block.create({
        data: {
          title: input.title,
          description: input.description,
          Repetition: {
            create: repetitions,
          },
          createdBy: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      })
    }),

  delete: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.block.delete({
        where: {
          id: input.postId,
        },
      })
    }),

  addTag: protectedProcedure
    .input(z.object({ postId: z.number(), text: z.string().max(30) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.block.update({
        where: {
          id: input.postId,
        },
        data: {
          tags: {
            create: {
              name: input.text,
            },
          },
        },
      })
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.block.findMany({
      orderBy: { createdAt: 'desc' },
      where: { createdBy: { id: ctx.session.user.id } },
      include: {
        tags: true,
      },
    })
  }),
})
