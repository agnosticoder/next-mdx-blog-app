import { useStore } from './store/todoStore';
import TodoItem from './TodoItem';

const TodoItems = () => {
    console.log('TodoItems');
    const todos = useStore();
    // console.log(todos);

    return todos.map((todo) => <TodoItem key={todo.id} todo={todo} />);
};

export default TodoItems;
