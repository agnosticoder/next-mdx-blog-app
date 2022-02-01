import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useUpdateTodo } from '../store/todoStore';
import getTodo from '../../lib/getTodo';

const Modal = ({ setIsOpenModal, children, todo }) => {
    const [updatedTitle, setUpdatedTitle] = useState('');
    const inputRef = useRef();
    const updateTodo = useUpdateTodo();
    const router = useRouter();

    const update = {
        title: updatedTitle,
        completed: todo.completed,
    };

    const onUpdateTodo = async (e) => {
        e.preventDefault();
        const res = await updateTodo(update, todo.id);
        setIsOpenModal(false);
        if (res.status === 200) {
            router.replace(router.asPath);
        }
    };

    useEffect(() => {
        (async function () {
            const res = await (await getTodo(todo.id)).json();
            const { title } = await res;
            setUpdatedTitle(title);
        })();
    }, [todo.id]);

    useEffect(() => {
        inputRef.current.focus();
        console.log('focus');
    }, []);

    return (
        <div>
            {children}
            <form>
                <textarea
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.currentTarget.value)}
                    placeholder="Edit"
                    ref={inputRef}
                />
                <button onClick={onUpdateTodo} type="submit">
                    Update
                </button>
                <button onClick={() => setIsOpenModal(false)} type="button">
                    Close Modal
                </button>
            </form>
        </div>
    );
};

export default Modal;
