import Head from 'next/head';
import Link from 'next/link';
import { ReactElement } from 'react';
import useUser from './hooks/useUser';
import Logout from './Logout';


const Layout = ({ children }: { children: ReactElement }) => {

    return (
        // const Layout = ({ children }) => (
        <div>
            <Head>
                <title>Next MDX Notes App</title>
            </Head>
            <div className="header">
                <div className="nav-container">
                    <ul className="nav">
                        <li>
                            <Link href="/">
                                <a className="nav-link">Dashboard</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/notes">
                                <a className="nav-link">Posts</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/login">
                                <a className="nav-link">Login</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/signup">
                                <a className="nav-link">Sign up</a>
                            </Link>
                        </li>
                        <li>
                            <Logout />
                        </li>
                    </ul>
                </div>
                <h1>MDX Blogging Platform</h1>
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
