'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const path = usePathname();

    return (
        <div>
            <h1 className="text-3xl bold mb-6">Dashboard</h1>
            <div className="sm:grid sm:grid-cols-4 sm:gap-2">
                <div className="list-none col-span-1">
                    <Link
                        href="/appDir/user/dashboard/posts"
                        className={`block w-full p-2 rounded mb-2 ${
                            path === '/appDir/user/dashboard/posts'
                                ? 'bg-teal-700 text-stone-200 hover:bg-teal-800'
                                : 'text-teal-800 bg-stone-100 hover:bg-stone-300'
                        }`}
                    >
                        Published Posts
                    </Link>
                    <Link
                        href="/appDir/user/dashboard/drafts"
                        className={`block w-full p-2 rounded mb-2 ${
                            path === '/appDir/user/dashboard/drafts'
                                ? 'bg-teal-700 text-stone-200 hover:bg-teal-800'
                                : 'text-teal-800 bg-stone-100 hover:bg-stone-300'
                        }`}
                    >
                        Drafts
                    </Link>
                </div>
                <div className="col-span-3">{children}</div>
            </div>
        </div>
    );
};

export default DashboardLayout;
