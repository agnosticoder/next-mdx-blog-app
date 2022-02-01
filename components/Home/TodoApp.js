import { useEffect, useState } from 'react';
import TodoItems from './TodoItems';
import AddTodoForm from './AddTodoForm';
import { useDispatch } from '../store/todoStore';

const TodoApp = ({ data }) => {
    const [error, setError] = useState('');
    console.log('Todo');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'initial', payload: data });
    }, [data]);

    return (
        <div>
            {error && <h3>{error}</h3>}
            <AddTodoForm setError={setError} />
            <TodoItems />
        </div>
    );
};

export default TodoApp;
