import { useEffect, useState } from 'react';
import TodoItems from './TodoItems';
import AddTodoForm from './AddTodoForm';
import { useDispatch } from './store/todoStore';
import { Todo } from './TodoItem';

const TodoApp = ({ posts }: {posts: Todo[]}) => {
    const [error, setError] = useState('');
    console.log('Todo');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'initial', payload: posts });
    }, [posts, dispatch]);

    return (
        <div>
            {error && <h3>{error}</h3>}
            <AddTodoForm setError={setError} />
            <TodoItems />
        </div>
    );
};

export default TodoApp;
