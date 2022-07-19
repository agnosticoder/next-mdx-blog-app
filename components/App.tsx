import { TodoProvider } from './store/todoStore';
import TodoApp from './TodoApp';
import type { Todo } from './TodoItem';
// eslint-disable-next-line import/no-unresolved

const App = () => {
    return (
        <div>
            <TodoProvider>
                <TodoApp/>
            </TodoProvider>
        </div>
    );
};

export default App;
