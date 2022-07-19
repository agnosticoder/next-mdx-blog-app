import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import styles from '../styles/modules/AddTodoForm.module.scss';
import { trpc } from '../utils/trpc';

const AddTodoForm = ({ setError }: { setError: Dispatch<SetStateAction<string>> }) => {
    const [todoTitle, setTodoTitle] = useState('');
    const utils = trpc.useContext();
    const { mutate } = trpc.useMutation(['post.create'], {
        onSuccess: () => {
            setTodoTitle('');
            setError('');
            utils.invalidateQueries(['post.userPosts']);
        },
    });

    const todo = {
        createdAt: Date.now().toString(),
        content: todoTitle,
        isDone: false,
    };

    const handleAddTodo = async (e: MouseEvent) => {
        e.preventDefault();
        if (!todoTitle) {
            setError('Field Cannot be empty');
            return;
        }
        mutate(todo);
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
