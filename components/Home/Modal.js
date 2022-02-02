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
        content: updatedTitle,
        isDone: todo.isDone,
    };

    const onUpdateTodo = async (e) => {
        e.preventDefault();
        const res = await updateTodo(update, todo.createdAt);
        setIsOpenModal(false);
        console.log(await res.json());
        if (res.status === 200) {
            router.replace(router.asPath);
        }
    };

    useEffect(() => {
        (async function () {
            const res = await (await getTodo(todo.createdAt)).json();
            const { content } = await res;
            setUpdatedTitle(content);
        })();
    }, [todo.createdAt]);

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
