import { useStore } from './store/todoStore';
import TodoItem from './TodoItem';
import type { Todo } from './TodoItem';

const TodoItems = () => {
    console.log('TodoItems');
    const todos = useStore();

    console.log('todos TodoItem', todos);

    return todos.map((todo:Todo) => <TodoItem key={todo.id} {...todo} />);
};

export default TodoItems;
