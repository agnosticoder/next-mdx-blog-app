import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgProfile } from 'react-icons/cg';

//Todo: Delete this if not used
const GenricMenu = ({ children }: { children: React.ReactNode }) => {
    return (
            <Menu>
                <Menu.Button className="p-2 rounded-full hover:bg-stone-300/30">
                    <CgProfile size={30} />
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute top-14 right-5 w-52 bg-stone-100 text-teal-800 outline-none flex flex-col divide-y divide-stone-400/30 rounded-md p-1text-lg font-semibold border-[1px] border-stone-300 p-1 drop-shadow-md">
                        {children}
                    </Menu.Items>
                </Transition>
            </Menu>
    );
};

export default GenricMenu;
