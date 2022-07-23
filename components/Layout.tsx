import Head from 'next/head';
import Link from 'next/link';
import { ReactElement } from 'react';
import Logo from './Logo';
import Logout from './Logout';


const Layout = ({ children }: { children: ReactElement }) => {
    return (
        <div>
            <Head>
                <title>Next MDX Notes App</title>
            </Head>
            <header className='fixed top-0 w-full h-16 bg-stone-100 text-teal-700 z-10'>
                <div className="flex justify-between items-center h-full w-11/12 sm:max-w-3xl mx-auto">
                    <div>
                        <Link href="/">
                            <a>
                                <Logo />
                            </a>
                        </Link>
                    </div>
                    <div className="w-52">
                        <ul className="flex flex-row">
                            <li>
                                <Link href="/notes">
                                    <a className="">Posts</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/posts/create">
                                    <a className="">Create Post</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/login">
                                    <a className="">Login</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup">
                                    <a className="">Sign up</a>
                                </Link>
                            </li>
                            <li>
                                <Logout />
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <main className="mt-20 w-11/12 sm:max-w-3xl mx-auto">{children}</main>
        </div>
    );
};

export default Layout;
