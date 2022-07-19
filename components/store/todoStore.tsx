import { makeStoreWithReducer } from './makeStore';
// import getTodos from '../../lib/getTodos';

const todoActions = {
    addTodo: 'addTodo',
    deleteTodo: 'deleteTodo',
    updateTodo: 'updateTodo',
    toggleTodo: 'toggleTodo',
    initial: 'initial',
};

const reducer = (state:any, action:any) => {
    switch (action.type) {
        // case todoActions.addTodo:
        //     return [...state, action.todo];

        case todoActions.deleteTodo:
            return state.filter((todo:any) => todo.id !== action.id);

        case todoActions.updateTodo:
            return state.map((todo:any) => {
                if (todo.createdAt === action.payload.createdAt) {
                    console.log(action.payload);
                    return {
                        ...todo,
                        ...action.payload,
                    };
                }
                return todo;
            });

        case todoActions.toggleTodo:
            return state.map((todo:any) => {
                if (todo.createdAt === action.payload.createdAt) {
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

//todo: do something about this shitty code
const initialState:any[] = [
    // {
    //     id: Date.now(),
    //     title: 'This is my initial todo',
    //     completed: false,
    // },
];

const [TodoProvider, useStore, useDispatch] = makeStoreWithReducer(reducer, initialState, 'key');

export { TodoProvider, useStore, useDispatch };