import { Menu } from '@headlessui/react';
import { Dispatch, SetStateAction } from 'react';

interface NotesDropdownProps{
    id: string,
    onDeleteTodo: (id: string) => Promise<void>,
    setIsOpenModel: Dispatch<SetStateAction<boolean>>
}

const NotesDropdown = ({ id, onDeleteTodo, setIsOpenModel }: NotesDropdownProps) => {
    return (
        <Menu>
            <div className='relative'>
                <Menu.Button className='text-4xl'>
                    ...
                    {/* <MenuSVG /> */}
                </Menu.Button>
                <Menu.Items className='absolute right-1 top-12 block cursor-pointer bg-stone-500 rounded-md post-shadow text-stone-100 z-10'>
                    <div>
                        <Menu.Item>
                            {({ active }: { active: boolean }) => (
                                <button
                                    onClick={() => setIsOpenModel(true)}
                                    className={`${active ? 'bg-stone-500' : 'bg-stone-100'} text-stone-800 p-2 w-full`}
                                >
                                    Edit
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                    <div>
                        <Menu.Item>
                            {({ active }: { active: boolean }) => (
                                <button
                                    onClick={() => onDeleteTodo(id).catch((e) => console.warn(e))}
                                    className={`${active ? 'bg-stone-500' : 'bg-stone-100'} text-stone-800 p-2 w-full`}
                                >
                                    Delete
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </div>
        </Menu>
    );
};

export default NotesDropdown;