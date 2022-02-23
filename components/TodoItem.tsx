import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useState } from 'react';
import { useDeleteTodo, useToggleTodo } from './store/todoStore';
import Modal from './Modal';
import styles from '../styles/modules/TodoItem.module.scss';
import deleteTodoServer from '../lib/deleteTodo';
import NotesDropdown from './NotesDropdown';
import { FaRocket } from 'react-icons/fa';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import {MdCloudUpload} from 'react-icons/md';
import EditNoteModal from './EditNoteModal';
import LikeButton from './LikeButton';

export interface Todo {
    autherId: number;
    content: MDXRemoteSerializeResult;
    createdAt: string;
    id: number;
    isDone: boolean;
    _count: {likedBy: number}
    likedBy: {id: number}[]
}

const TodoItem = ({ ...todo }: Todo) => {
    console.log({ todo });
    const [isOpenModal, setIsOpenModal] = useState(false);

    const deleteTodo = useDeleteTodo();
    const toggleTodo = useToggleTodo();

    const { content, isDone, createdAt, id, autherId } = todo;

    //todo: to render only the excerpt of notes in the app
    //todo: when user clicks the notes then show the full note in a different dynamic path page
    //? can show full note in model as well like google does with google keep

    const onDeleteTodo = async (id: number) => {
        const res = await deleteTodoServer(id);
        if (!res) return;
        const { err, message, status } = res;
        console.log(err, message, status);
        //* pessimistic delete todo
        if (status === 200) deleteTodo(id);
        //todo: create error and message context and wrap the entire app
        //todo: dispatch action providing error or message
        //todo: display the message or error on top of display which will diappear after 1s
    };

    return (
        <div className={styles.container}>
            {/*//*  todo content rendered in mdx */}
            <div className={styles.noteWrapper}>
                <div className={styles.todo}>{content && <MDXRemote {...content} />}</div>
                <div className={styles.menu}>
                    <NotesDropdown id={id} setIsOpenModel={setIsOpenModal} onDeleteTodo={onDeleteTodo} />
                </div>
            </div>

            {autherId && (
                //! not rendering even when logged in
                //todo: make it work, change the DB schema accordingly
                //todo: include more field in local state form DB
                //* isDone will only be available if the user is signed in
                <div className={styles.dateWrapper}>
                    {/*//* toggle todo */}
                    <div className={styles.doneWrapper}>
                        <input
                            className={styles.checkbox}
                            id={String(id)}
                            type="checkbox"
                            checked={isDone}
                            onChange={() => toggleTodo({ createdAt, isDone: !isDone })}
                        />
                        <label
                            className={styles.publish}
                            title={`${isDone ? 'Unpublish' : 'Publish'}`}
                            htmlFor={String(id)}
                        >
                            <MdCloudUpload className={`${isDone ? styles.done : styles.notDone}`} />
                        </label>
                    </div>
                    {isDone && (
                        <LikeButton
                            totalLikes={todo._count.likedBy}
                            userId={todo.autherId}
                            postId={todo.id}
                            likedByIds={todo.likedBy.map((id) => id.id)}
                        />
                    )}
                    <div className={styles.date}>
                        <li>{new Date(Number(createdAt)).toDateString()}</li>
                    </div>
                    {/* {isOpenModal && (
                        <Modal todo={todo} setIsOpenModal={setIsOpenModal}>
                            Modal Text
                        </Modal>
                    )} */}
                    <EditNoteModal todo={todo} isOpenModal={isOpenModal} onClose={() => setIsOpenModal(false)} />
                </div>
            )}
        </div>
    );
};

export default TodoItem;
