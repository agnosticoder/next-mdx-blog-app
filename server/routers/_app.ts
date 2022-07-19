// This file contains the root router for the trpc server.

import { TRPCError } from '@trpc/server';
import createRouter from '../createRouter';
import postRouter from './post';
import userRouter from './user';

const appRouter = createRouter()
    .middleware(async ({meta, ctx, next}) => {
        if(meta?.hasAuth && !ctx.session.user) {
            throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You are not logged in' });
        }

        return next()
    })
    .merge('post.', postRouter)
    .merge('user.', userRouter);

export type AppRouter = typeof appRouter;

export default appRouter;