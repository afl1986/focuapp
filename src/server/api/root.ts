import { blockRouter } from '@/server/api/routers/block'
import { postRouter } from '@/server/api/routers/post'
import { createTRPCRouter } from '@/server/api/trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  blocks: blockRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
