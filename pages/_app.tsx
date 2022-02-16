import '../styles/styles.scss';
import Layout from '../components/Layout';
import { AppProps } from 'next/app';


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

export default MyApp;
