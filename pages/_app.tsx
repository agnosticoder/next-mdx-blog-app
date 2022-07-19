import '../styles/styles.scss';
import Layout from '../components/Layout';
import { AppProps } from 'next/app';
import { withTRPC } from '@trpc/next';
import { AppRouter } from '../server/routers/_app';


function MyApp({ Component, pageProps }: AppProps) {
// function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </div>
    );
}

export default withTRPC<AppRouter>({
    config: ({ctx}) => {
        const url = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/trpc` : 'http://localhost:3000/api/trpc';

        console.log('console.log(url)', url);

        return {
            url,
        }
    },
    ssr: true,
})(MyApp);
