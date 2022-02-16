import { TodoProvider } from './store/todoStore';
import TodoApp from './TodoApp';
import type { Todo } from './TodoItem';
// eslint-disable-next-line import/no-unresolved

const App = ({ posts }: {posts: Todo[]}) => {
    return (
        <div>
            <h1>Todo App</h1>
            <TodoProvider>
                <TodoApp posts={posts}/>
                {/* <Test /> */}
            </TodoProvider>
        </div>
    );
};

export default App;
