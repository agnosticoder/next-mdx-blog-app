import { useState } from 'react';
import AddTodoForm from './CreatePostForm';
import Post from './Post';
import { trpc } from '../utils/trpc';

const App = () => {
    const [error, setError] = useState('');
    const {data: todos} = trpc.useQuery(['post.userPosts']);

    return (
        <div>
            {error && <h3>{error}</h3>}
            <AddTodoForm/>
            {todos?.map((todo) => <Post key={todo.id} {...todo} />)}
        </div>
    );
};

export default App;
