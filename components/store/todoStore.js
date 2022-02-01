import { makeStoreWithReducer } from './makeStore';
import postTodo from '../../lib/postTodo';
import deleteTodo from '../../lib/deleteTodo';
import updateTodo from '../../lib/updateTodo';
import getTodos from '../../lib/getTodos';
import toggleTodo from '../../lib/toggleTodo';

const todoActions = {
    addTodo: 'addTodo',
    deleteTodo: 'deleteTodo',
    updateTodo: 'updateTodo',
    toggleTodo: 'toggleTodo',
    initial: 'initial',
};

const reducer = (state, action) => {
    switch (action.type) {
        case todoActions.addTodo:
            return [...state, action.todo];

        case todoActions.deleteTodo:
            return state.filter((todo) => todo.id !== action.id);

        case todoActions.updateTodo:
            return state.map((todo) => {
                if (todo.id === action.payload.id) {
                    console.log(action.payload);
                    return {
                        ...todo,
                        ...action.payload,
                    };
                }
                return todo;
            });

        case todoActions.toggleTodo:
            return state.map((todo) => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        ...action.payload,
                    };
                }
                return todo;
            });

        case todoActions.initial:
            return action.payload;

        default:
            return state;
    }
};

const initialState = [
    // {
    //     id: Date.now(),
    //     title: 'This is my initial todo',
    //     completed: false,
    // },
];

const [TodoProvider, useStore, useDispatch] = makeStoreWithReducer(reducer, initialState, 'key');

export { TodoProvider, useStore, useDispatch };

/* --------------------------------- Actions -------------------------------- */
export const useAddTodo = () => {
    const dispatch = useDispatch();
    return async (todo) => {
        const data = await (await getTodos()).json();
        console.log(data);
        const res = await postTodo(todo);
        if (res?.status === 201) {
            console.log('Your todo has been created');
            // dispatch({ type: todoActions.addTodo, todo });
        }
        return res.status;
    };
};

export const useDeleteTodo = () => {
    const dispatch = useDispatch();
    return async (id) => {
        const res = await deleteTodo(id);
        if (res?.status === 200) {
            dispatch({ type: todoActions.deleteTodo, id });
        }
    };
};

export const useUpdateTodo = () => {
    const dispatch = useDispatch();
    return async (todo, id) => {
        const res = await updateTodo(todo, id);
        if (res?.status === 200) {
            console.log({ id, ...todo });
            // dispatch({ type: todoActions.updateTodo, payload: { id, ...todo } });
        }
        return res;
    };
};

// doing pessimistic toggle (opposite to optimistic toggle)
export const useToggleTodo = () => {
    const dispatch = useDispatch();
    return async (completed, id) => {
        const res = await toggleTodo(completed, id);
        if (res?.status === 200) {
            dispatch({ type: todoActions.toggleTodo, payload: { completed, id } });
        }
    };
};
