import { Menu } from '@headlessui/react';
import GenricMenu from './GenricMenu';
import Link from 'next/link';

const NavbarMenu = () => {
    return (
        <GenricMenu>
            <Menu.Item>
                {({ active }: { active: boolean }) => (
                    // Todo: Later I can change to prefetch using Link or react-query
                    <div
                        className={`block rounded text-left  ${
                            active ? 'bg-teal-800 text-stone-100' : 'bg-transparent'
                        }`}
                    >
                        <Link href={`/appDir/user/dashboard/posts`} className="block px-4 py-2">
                            Dashboard
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
                        <Link href={`/appDir/user/post/create`} className="block px-4 py-2">
                            Create Post
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
                            //Todo: implement in server actions
                            // logout();
                        }}
                    >
                        Sign out
                    </button>
                )}
            </Menu.Item>
        </GenricMenu>
    );
};

export default NavbarMenu;
