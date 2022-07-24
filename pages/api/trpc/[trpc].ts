import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { withSessionRoute } from '../../../lib/withSession';
import createContext from '../../../server/context';
import appRouter from '../../../server/routers/_app';

//Todo: make cors work may be try cors library
const withCors = (handler:NextApiHandler) => {
    return async (req:NextApiRequest, res:NextApiResponse) => {
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
         });
         return handler(req, res);
    }
}

export default withCors(withSessionRoute(trpcNext.createNextApiHandler({ router: appRouter, createContext})));