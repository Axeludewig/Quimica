import * as trpc from '@trpc/server';
import { any, z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { Prisma } from '@prisma/client';


export const itemRouter = router({
  add: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .mutation(async ({ input, ctx }) => { 
         try {
            await ctx.prisma.items.create({
          data: {
            name: input?.text
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.items.findMany();
    
  }),
});

export type itemRouter = typeof itemRouter;