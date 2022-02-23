import { createContext, useContext, useMemo, useReducer, useState } from 'react';
// import useGetInitialState from '../hooks/useGetInitialState';
// import useIsDB from '../hooks/useIsDB';
// import useIsLocalStorage from '../hooks/useIsLocalStorage';

interface makeStoreProviderProps{
    init: any,
    children: JSX.Element
}

const makeStore = () => {
    const Context = createContext<any>(null);
    const useStore = () => useContext(Context);

    const Provider = ({ init = {}, children }: makeStoreProviderProps) => {
        const [state, setState] = useState(init);
        // console.log('makeStore');

        const contextValue = useMemo(() => [state, setState], [state]);

        return <Context.Provider value={contextValue}>{children}</Context.Provider>;
    };

    return [Provider, useStore];
};

export default makeStore;

/* ---------------------------------- Todo ---------------------------------- */
// - Implement makeStore using useReducer and LocalStorage
// - https://www.youtube.com/watch?v=J-g9ZJha8FE

type State = any;

type Action = State;

type UserReducer = (state: State, action: Action) => any;

type InitialState = any[] | object


export const makeStoreWithReducer = (userReducer:UserReducer, initialState: InitialState = [], key:string) => {
    const storeContext = createContext<any>(null);
    const dispatchContext = createContext<any>(null);

    const useStore = () => useContext(storeContext);
    const useDispatch = () => useContext(dispatchContext);

    const reducer = (state: State, action: Action) => {
        const newState = userReducer(state, action);
        // localStorage.setItem(key, JSON.stringify(newState));
        return newState;
    };

    const Provider = ({ children }: {children: JSX.Element}) => {
        // const { isLocal } = useIsLocalStorage();
        // const { isDB, DB } = useIsDB();
        const [state, dispatch] = useReducer(reducer, initialState);
        // useGetInitialState({ isLocal, dispatch, key, initialState });
        // useGetInitialState({ isDB, DB, dispatch, key, initialState });
        // console.log('makeStoreWithReducer');

        return (
            <dispatchContext.Provider value={dispatch}>
                <storeContext.Provider value={state}>{children}</storeContext.Provider>
            </dispatchContext.Provider>
        );
    };

    return [Provider, useStore, useDispatch] as const;
};
