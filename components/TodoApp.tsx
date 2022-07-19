import { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import Post from './Post';
import { trpc } from '../utils/trpc';

const TodoApp = () => {
    const [error, setError] = useState('');
    const {data: todos} = trpc.useQuery(['post.userPosts']);

    return (
        <div>
            {error && <h3>{error}</h3>}
            <AddTodoForm setError={setError} />
            {todos?.map((todo) => <Post key={todo.id} {...todo} />)}
        </div>
    );
};

export default TodoApp;
