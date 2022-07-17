import * as trpc from '@trpc/server';
import type { Context } from './context';

const createRouter = () => {
    return trpc.router<Context>();
}

export default createRouter;