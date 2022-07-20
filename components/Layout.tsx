import Head from 'next/head';
import Link from 'next/link';
import { ReactElement } from 'react';
import Logout from './Logout';


const Layout = ({ children }: { children: ReactElement }) => {

    return (
        <div>
            <Head>
                <title>Next MDX Notes App</title>
            </Head>
            <div className='flex flex-col min-h-[100px] justify-center bg-[#62929E] text-[#C6C5B9] mb-8'>
                <div>
                    <ul className='flex justify-evenly mb-8'>
                        <li>
                            <Link href="/">
                                <a className=''>Dashboard</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/notes">
                                <a className=''>Posts</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/login">
                                <a className=''>Login</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/signup">
                                <a className=''>Sign up</a>
                            </Link>
                        </li>
                        <li>
                            <Logout />
                        </li>
                    </ul>
                </div>
                <h1 className='text-center'>MDX Blogging Platform</h1>
            </div>
            <main className='w-[80%] mx-auto'>{children}</main>
        </div>
    );
};

export default Layout;
