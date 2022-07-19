import * as trpc from '@trpc/server';
import type { Context } from './context';

type Meta = {
    hasAuth: boolean;
}

const createRouter = () => {
    return trpc.router<Context, Meta>();
}

export default createRouter;