import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { withSessionRoute } from '../../../lib/withSession';
import createContext from '../../../server/context';
import appRouter from '../../../server/routers/_app';

export default withSessionRoute(trpcNext.createNextApiHandler({ router: appRouter, createContext}));

