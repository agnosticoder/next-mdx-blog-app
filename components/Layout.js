import Head from 'next/head';
import Link from 'next/link';

const Layout = ({ children }) => (
    <div>
        <Head>
            <title>Next MDX Notes App</title>
        </Head>
        <div className="header">
            <div className="nav-container">
                <ul className="nav">
                    <li>
                        <Link href="/">
                            <a className="nav-link">Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/playground">
                            <a className="nav-link">Playground</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/notes">
                            <a className="nav-link">Notes</a>
                        </Link>
                    </li>
                </ul>
            </div>
            <h1>CSS Variable App</h1>
        </div>
        <main>{children}</main>
    </div>
);

export default Layout;
