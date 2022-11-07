import * as trpc from '@trpc/server';
import { any, z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { Prisma } from '@prisma/client';
import { client }

const itemRouter = router({
    addItem: publicProcedure
      .input(z.string())
      .mutation(async ({ input }) => {
        const post = await client.post.create({
          data: input,
        });
        return post;
      }),
  });   


export type itemRouter = typeof itemRouter;