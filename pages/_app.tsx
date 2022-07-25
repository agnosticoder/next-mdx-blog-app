import '../styles/main.css';
import Layout from '../components/Layout';
import { AppProps } from 'next/app';
import { withTRPC } from '@trpc/next';
import { AppRouter } from '../server/routers/_app';
import {ReactQueryDevtools} from 'react-query/devtools';
import 'highlight.js/styles/atom-one-dark.css';
import superjson from 'superjson';

function MyApp({ Component, pageProps }: AppProps) {
// function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Layout>
                <Component {...pageProps} />
            </Layout>
            <ReactQueryDevtools />
        </div>
    );
}

export default withTRPC<AppRouter>({
    config: ({ctx}) => {
        //? : change the url with env variable maybe
        const url = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://next-mdx-notes-app.vercel.app/api/trpc` : 'http://localhost:3000/api/trpc';

        return {
            url,
            fetch: (url, options) => {
                return fetch(url, {...options, credentials: 'include'});
            },
            transformer: superjson,
        }
    },
    ssr: true,
})(MyApp);
