import * as trpc from '@trpc/server';
import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

const createContext = async ({req, res}:trpcNext.CreateNextContextOptions) => {
    return {
        session: req.session
    }
};

export type Context = inferAsyncReturnType<typeof createContext>; 

export default createContext;

