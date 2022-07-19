import type { AppRouter } from '../server/routers/_app';
import { createTRPCClient } from '@trpc/client';

const client = createTRPCClient<AppRouter>({
    url: process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
        : 'http://localhost:3000/api/trpc',
});

export default client;
