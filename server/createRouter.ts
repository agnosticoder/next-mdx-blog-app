import * as trpc from '@trpc/server';

const createRouter = () => {
    return trpc.router();
}

export default createRouter;