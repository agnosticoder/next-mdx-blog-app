// This file contains the root router for the trpc server.

import createRouter from '../createRouter';
import postRouter from './post';

const appRouter = createRouter()
.merge('post.', postRouter);

export type AppRouter = typeof appRouter;

export default appRouter;