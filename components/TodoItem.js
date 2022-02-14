import { MDXRemote } from 'next-mdx-remote';
import { useState } from 'react';
import { useDeleteTodo, useToggleTodo } from './store/todoStore';
import Modal from './Modal';
import styles from '../styles/modules/TodoItem.module.scss';
import deleteTodoServer from '../lib/deleteTodo';

const TodoItem = ({ todo }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const deleteTodo = useDeleteTodo();
    const toggleTodo = useToggleTodo();

    const { content, isDone, createdAt, id, autherId } = todo;

    //todo: to render only the excerpt of notes in the app
    //todo: when user clicks the notes then show the full note in a different dynamic path page
    //? can show full note in model as well like google does with google keep

    const onDeleteTodo = async (id) => {
        const res = await deleteTodoServer(id);
        const { err, message, status } = res;
        //* pessimistic delete todo
        if (status === 200) deleteTodo(id);
        //todo: create error and message context and wrap the entire app
        //todo: dispatch action providing error or message
        //todo: display the message or error on top of display which will diappear after 1s
    };

    return (
        <div className={styles.container}>
            {/*//*  todo content rendered in mdx */}
            <div className={styles.todo}>{content && <MDXRemote {...content} />}</div>
            <li>{new Date(Number(createdAt)).toDateString()}</li>

            {autherId && (
                //! not rendering even when logged in
                //todo: make it work, change the DB schema accordingly
                //todo: include more field in local state form DB
                //* isDone will only be available if the user is signed in
                <div>
                    {/*//* toggle todo */}
                    <input type="checkbox" checked={isDone} onChange={() => toggleTodo(!isDone, createdAt)} />

                    {/*//* delete todo */}
                    <button onClick={() => onDeleteTodo(id).catch((e) => console.log(e))} type="button">
                        Delete Todo
                    </button>

                    {/*//* edit todo */}
                    <button onClick={() => setIsOpenModal(true)} type="button">
                        Edit Todo
                    </button>
                    {isOpenModal && (
                        <Modal todo={todo} setIsOpenModal={setIsOpenModal}>
                            Modal Text
                        </Modal>
                    )}
                </div>
            )}
        </div>
    );
};

export default TodoItem;
