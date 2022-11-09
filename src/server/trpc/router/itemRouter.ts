import * as trpc from '@trpc/server';
import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { initTRPC } from '@trpc/server'
import { prisma } from '../../prisma';
import { TRPCError } from '@trpc/server';

export const t = initTRPC.create();

const defaultItemsSelect = Prisma.validator<Prisma.itemsSelect>()({
  id: true,
  name: true
});

export const itemRouter = router({

  addItem: publicProcedure
  .input(z.object({ name: z.string()}))
  .mutation(async ({ input }) => { 
         const item = await prisma.items.create({
          data: input,
      });
      return item;
  }),
  
  list: publicProcedure
  .input(
    z.object({
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.string().nullish(),
    }),
  )
  .query(async ({ input }) => {
    /**
     * For pagination docs you can have a look here
     * @see https://trpc.io/docs/useInfiniteQuery
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
     */

    const limit = input.limit ?? 50;
    const { cursor } = input;

    const items = await prisma.items.findMany({
      select: defaultItemsSelect,
      // get an extra item at the end which we'll use as next cursor
      take: limit + 1,
      where: {},
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
      orderBy: {
        id: 'desc',
      },
    });
    let nextCursor: typeof cursor | undefined = undefined;
    if (items.length > limit) {
      // Remove the last item and use it as next cursor

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const nextItem = items.pop()!;
      nextCursor = nextItem.id;
    }

    return {
      items: items.reverse(),
      nextCursor,
    };
  }),


byId: publicProcedure
.input(
  z.object({
    id: z.string(),
  }),
)
.query(async ({ input }) => {
  const { id } = input;
  const post = await prisma.items.findMany({
    where: { id },
  });
  if (!post) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `No post with id '${id}'`,
    });
  }
  return post;
}),
});

export type itemRouter = typeof itemRouter;