import * as trpc from '@trpc/server';
import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import NextCors from 'nextjs-cors';

const createContext = async ({req, res}:trpcNext.CreateNextContextOptions) => {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });

    return {
        session: req.session
    }
};

export type Context = inferAsyncReturnType<typeof createContext>; 

export default createContext;

