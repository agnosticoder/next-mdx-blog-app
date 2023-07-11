'use client'

import Link from 'next/link';
import NavbarMenu from './NavbarMenu';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const path = usePathname();
    const user = {};

    return (
        <div>
                    {path !== '/user/post/create' && user && (
                        <div className="w-52 flex justify-end items-center gap-2">
                            <ul className="">
                                <li>
                                    <Link href="/appDir/user/post/create" className="hover:bg-stone-300/30 p-2 rounded">Create Post
                                    </Link>
                                </li>
                            </ul>
                            <NavbarMenu />
                        </div>
                    )}
                    {!user && (
                        <ul className="w-52 flex justify-end items-center gap-2">
                            <li>
                                <Link href="/appDir/login" className="hover:bg-stone-300/30 hover:drop-shadow p-2 rounded">Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/appDir/signup" className="bg-teal-600 text-stone-100 hover:bg-teal-800 hover:drop-shadow p-2 rounded">
                                        Sign up
                                </Link>
                            </li>
                        </ul>
                    )}
        </div>
    );
}

export default Navbar;