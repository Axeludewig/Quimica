import * as trpc from '@trpc/server';
import { any, z } from 'zod';
import { publicProcedure, router } from '../trpc';
 
const itemRouter = router({
    greeting: publicProcedure
      .input(z.string())
      .mutation(({ input }) => `hello ${input}!`),
  });


export type itemRouter = typeof itemRouter;