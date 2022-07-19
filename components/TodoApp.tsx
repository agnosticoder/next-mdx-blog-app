import { useEffect, useState } from 'react';
import TodoItems from './TodoItems';
import AddTodoForm from './AddTodoForm';
import { useDispatch } from './store/todoStore';
import { Todo } from './TodoItem';
import { trpc } from '../utils/trpc';

const TodoApp = () => {
    const [error, setError] = useState('');
    const {data: posts} = trpc.useQuery(['post.userPosts']);
    console.log('posts', posts);

    const dispatch = useDispatch();

    useEffect(() => {
        if (posts) {
            dispatch({ type: 'initial', payload: posts });
        }
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
