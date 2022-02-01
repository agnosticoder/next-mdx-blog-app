import { TodoProvider } from '../store/todoStore';
import TodoApp from './TodoApp';
// eslint-disable-next-line import/no-unresolved

const App = ({ data }) => {

    return (
        <div>
            <h1>Todo App</h1>
            <TodoProvider>
                <TodoApp data={data} />
                {/* <Test /> */}
            </TodoProvider>
        </div>
    );
};

export default App;
