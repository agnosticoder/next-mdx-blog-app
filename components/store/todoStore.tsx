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














































/* --------------------------------- Actions -------------------------------- */
export const useAddTodo = () => {
    return async (todo: PostTodoProps) => {
        // const data = await (await getTodos()).json();
        // console.log(data);
        console.log({todo});
        const res = await postTodo(todo);
        console.log(await res?.json());
        if (res?.status === 201) {
            console.log('Your todo has been created');
            //* can't do pessimistic update
            //* can't do dispatch because mdx needs to be compiled server side
            // dispatch({ type: todoActions.addTodo, todo });
        }
        return res?.status;
    };
};

export const useDeleteTodo = () => {
    const dispatch = useDispatch();
    return async (id:number) => {
        dispatch({ type: todoActions.deleteTodo, id });
        // const res = await deleteTodo(id);
        // console.log({res});
        // if (res?.status === 200) {
        //     console.log('pessimistic todo deleted');
        //     dispatch({ type: todoActions.deleteTodo, id });
        // }
    };
};

export const useUpdateTodo = () => {
    return async ({ createdAt, update }: UpdateTodoProps) => {
        try {
            const res = await updateTodo({ createdAt, update });
            if (res?.status === 200) {
                // console.log({ createdAt, ...todo });
                // dispatch({ type: todoActions.updateTodo, payload: { id, ...todo } });
            }
            return res;
        } catch (err) {
            console.warn({ err });
        }
    };
};

// doing pessimistic toggle (opposite to optimistic toggle)
export const useToggleTodo = () => {
    const dispatch = useDispatch();
    return async ({createdAt, isDone}:ToggleTodoProps) => {
        const res = await toggleTodo({createdAt, isDone});
        if (res?.status === 200) {
            console.log('toggled');
            dispatch({ type: todoActions.toggleTodo, payload: { isDone, createdAt } });
        }
    };
};

interface UseLikePostResult {
    message: string;
    onSuccess: boolean;
    result: {
        autherId: number;
    };
}

export const useLikePost = () => {
    const dispatch = useDispatch();
    return async ({isLike, postId, userId}:LikePostProps) => {
        const res = await likePost({isLike, postId, userId})
        const result: UseLikePostResult =  await res?.json();
        return {res, result};
        console.log('todoStore', {res});
    }
}
