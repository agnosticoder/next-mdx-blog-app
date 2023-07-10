import { Menu } from '@headlessui/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { CgProfile } from 'react-icons/cg';
import { MdEdit } from 'react-icons/md';
import { trpc } from '../utils/trpc';
import GenricMenu from './GenricMenu';
import Logo from './Logo';
import Logout from './Logout';


const Layout = ({ children }: { children: ReactElement }) => {
    const router = useRouter();
    const path = router.pathname;
    const utils = trpc.useContext();
    const { data: user } = trpc.useQuery(['user.get']);
    const { mutate: logout } = trpc.useMutation(['user.logout'], {
        onSuccess: () => {
            utils.invalidateQueries(['user.get']);
            router.push('/');
        },
    });

    return (
        <div>
            <Head>
                <title>Next MDX Notes App</title>
            </Head>
            <header className="fixed top-0 w-full h-16 bg-stone-100 text-teal-700 z-10 drop-shadow">
                <div className="relative flex justify-between items-center h-full w-11/12 sm:max-w-7xl mx-auto">
                    <div>
                        <Link href="/">
                            <a>
                                <Logo />
                            </a>
                        </Link>
                    </div>
                    {path !== '/user/post/create' && user && (
                        <div className="w-52 flex justify-end items-center gap-2">
                            <ul className="">
                                {/* //Todo: No need for following route, may be delete it */}
                                {/* <li>
                                <Link href="/notes">
                                    <a className="">Posts</a>
                                </Link>
                            </li> */}
                                <li>
                                    <Link href="/user/post/create" className="hover:bg-stone-300/30 p-2 rounded">Create Post
                                    </Link>
                                </li>
                                {/* <li>
                                <Link href="/login">
                                    <a className="">Login</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup">
                                    <a className="">Sign up</a>
                                </Link>
                            </li> */}
                                {/* <li>
                                <Logout />
                            </li> */}
                            </ul>
                            <GenricMenu>
                                <Menu.Item>
                                    {({ active }: { active: boolean }) => (
                                        // Todo: Later I can change to prefetch using Link or react-query
                                        <div
                                            className={`block rounded text-left  ${
                                                active ? 'bg-teal-800 text-stone-100' : 'bg-transparent'
                                            }`}
                                        >
                                            <Link href={`/user/dashboard`} className="block px-4 py-2">Dashboard
                                            </Link>
                                        </div>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }: { active: boolean }) => (
                                        // Todo: Later I can change to prefetch using Link or react-query
                                        <div
                                            className={`block rounded text-left ${
                                                active ? 'bg-teal-800 text-stone-100' : 'bg-transparent'
                                            }`}
                                        >
                                            <Link href={`/user/post/create`} className="block px-4 py-2">Create Post
                                            </Link>
                                        </div>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }: { active: boolean }) => (
                                        // Todo: Later I can change to prefetch using Link or react-query
                                        <button
                                            className={`rounded text-left px-4 py-2 ${
                                                active ? 'bg-teal-800 text-stone-100' : 'bg-transparent'
                                            }`}
                                            onClick={() => {
                                                logout();
                                            }}
                                        >
                                            Sign out
                                        </button>
                                    )}
                                </Menu.Item>
                            </GenricMenu>
                        </div>
                    )}
                    {!user && (
                        <ul className="w-52 flex justify-end items-center gap-2">
                            <li>
                                <Link href="/login" className="hover:bg-stone-300/30 hover:drop-shadow p-2 rounded">Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup" className="bg-teal-600 text-stone-100 hover:bg-teal-800 hover:drop-shadow p-2 rounded">
                                        Sign up
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </header>
            <main className="mt-20 w-11/12 sm:max-w-3xl mx-auto">{children}</main>
        </div>
    );
};

export default Layout;
