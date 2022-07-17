// This file contains the root router for the trpc server.

import createRouter from '../createRouter';
import postRouter from './post';
import userRouter from './user';

const appRouter = createRouter()
    .query('hello', {
        resolve: async ({ ctx }) => {
            ctx.session.user = {
                id: 1,
            }
            await ctx.session.save();
            return ctx;
        },
    })
    .merge('post.', postRouter)
    .merge('user.', userRouter);

export type AppRouter = typeof appRouter;

export default appRouter;