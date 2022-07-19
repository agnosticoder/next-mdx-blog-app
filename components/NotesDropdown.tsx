import { Menu } from '@headlessui/react';
import { Dispatch, SetStateAction } from 'react';
import styles from '../styles/modules/NotesDropdown.module.scss';

interface NotesDropdownProps{
    id: string,
    onDeleteTodo: (id: string) => Promise<void>,
    setIsOpenModel: Dispatch<SetStateAction<boolean>>
}

const NotesDropdown = ({ id, onDeleteTodo, setIsOpenModel }: NotesDropdownProps) => {
    return (
        <Menu>
            <div className={styles.menuContainer}>
                <Menu.Button className={styles.menu}>
                    ...
                    {/* <MenuSVG /> */}
                </Menu.Button>
                <Menu.Items className={styles.optionsContainer}>
                    <div>
                        <Menu.Item>
                            {({ active }: { active: boolean }) => (
                                <button
                                    onClick={() => setIsOpenModel(true)}
                                    className={`${active && styles.optionActive} ${styles.option}`}
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
                                    className={`${active && styles.optionActive} ${styles.option}`}
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