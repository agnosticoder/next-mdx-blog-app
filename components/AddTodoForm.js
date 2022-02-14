import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAddTodo } from './store/todoStore';
import styles from '../styles/modules/AddTodoForm.module.scss';

const AddTodoForm = ({ setError }) => {
    console.log('AddTodoItem');
    const [todoTitle, setTodoTitle] = useState('');
    const addTodo = useAddTodo();
    const router = useRouter();

    const todo = {
        createdAt: Date.now().toString(),
        content: todoTitle,
        isDone: false,
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!todoTitle) {
            setError('Field Cannot be empty');
            return;
        }
        const status = await addTodo(todo);
        if (status === 201) {
            router.replace(router.asPath);
            setTodoTitle('');
            setError('');
        }
    };

    return (
        <div className={styles.container}>
            <div>
                <form>
                    {/* eslint-disable-next-line react/self-closing-comp */}
                    <textarea
                        className={styles.textarea}
                        placeholder="Add Todo"
                        value={todoTitle}
                        onChange={(e) => {
                            setError('');
                            setTodoTitle(e.currentTarget.value);
                        }}
                    />
                    <button className={styles.button} type="submit" onClick={handleAddTodo}>
                        Add Todo
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTodoForm;
