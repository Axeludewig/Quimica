import { itemRouter } from "./itemRouter";
import { initTRPC } from '@trpc/server'
import { z } from "zod";

export const t = initTRPC.create()

export const appRouter = t.router({
    item: itemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
