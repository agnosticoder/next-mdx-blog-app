import { MDXRemote } from 'next-mdx-remote';
import { useState } from 'react';
import { useDeleteTodo, useToggleTodo } from '../store/todoStore';
import Modal from './Modal';
import styles from '../../styles/modules/TodoItem.module.scss';

const TodoItem = ({ todo }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const deleteTodo = useDeleteTodo();
    const toggleTodo = useToggleTodo();

    // console.log({ todo });

    return (
        <div className={styles.container}>
            {/* <li>{todo.title}</li> */}
            <div className={styles.todo}>{todo.content && <MDXRemote {...todo.content} />}</div>
            {/* <li>{todo.completed ? 'Done' : 'Pending'}</li> */}
            <li>{new Date(Number(todo.createdAt)).toDateString()}</li>
            <input type="checkbox" checked={todo.isDone} onChange={() => toggleTodo(!todo.isDone, todo.createdAt)} />
            <button onClick={() => deleteTodo(todo.createdAt)} type="button">
                Delete Todo
            </button>
            <button onClick={() => setIsOpenModal(true)} type="button">
                Edit Todo
            </button>
            {isOpenModal && (
                <Modal todo={todo} setIsOpenModal={setIsOpenModal}>
                    Modal Text
                </Modal>
            )}
        </div>
    );
};

export default TodoItem;
