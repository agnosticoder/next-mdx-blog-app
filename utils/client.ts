import type { AppRouter } from '../server/routers/_app';
import { createTRPCClient } from '@trpc/client';

const client = createTRPCClient<AppRouter>({
    url: 'http://localhost:3000/api/trpc',   
});

export default client;
