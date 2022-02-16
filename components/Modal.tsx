import { Dispatch, MouseEvent, MouseEventHandler, ReactElement, SetStateAction, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useUpdateTodo } from './store/todoStore';
import getTodo from '../lib/getTodo';
import { Todo } from './TodoItem';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface ModelProps {
    todo: Todo,
    setIsOpenModal: Dispatch<SetStateAction<boolean>>,
    children: string
}


const Modal = ({ setIsOpenModal, children, todo }: ModelProps) => {
    const [updatedTitle, setUpdatedTitle] = useState('');
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const updateTodo = useUpdateTodo();
    const router = useRouter();

    const update = {
        content: updatedTitle,
        isDone: todo.isDone,
    };

    const { createdAt } = todo;

    const onUpdateTodo = async (e:MouseEvent) => {
        e.preventDefault();
        const res = await updateTodo({update, createdAt});
        setIsOpenModal(false);
        console.log(await res?.json());
        if (res?.status === 200) {
            router.replace(router.asPath);
        }
    };

    useEffect(() => {
        (async function () {
            const res = await getTodo(todo.createdAt);
            if(!res) return;
            const { content } = res;
            setUpdatedTitle(content);
        })();
    }, [todo.createdAt]);

    useEffect(() => {
        inputRef.current?.focus();
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
