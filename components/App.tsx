import { TodoProvider } from './store/todoStore';
import TodoApp from './TodoApp';

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
