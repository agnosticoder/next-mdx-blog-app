import { Dispatch, useEffect } from 'react';
import getTodos from '../../lib/getTodos';

interface UseGetInitialStateProps{
    isLocal: boolean,
    isDB: boolean,
    DB: string,
    dispatch: Dispatch<any>,
    key: string,
    initialState: string
}

const useGetInitialState = ({ isLocal, isDB, DB, dispatch, key, initialState }: UseGetInitialStateProps) => {
    useEffect(() => {
        console.log('getInitialState');
        // Try to fetch saved local storage data for the store if exist on provided key
        // we executed this in useEffect block because we don't want it to run on server side and also before first render
        (async function () {
            try {
                // eslint-disable-next-line no-param-reassign
                // if (isLocal) {
                //     const getState = JSON.parse(localStorage.getItem(key)) || initialState;
                //     dispatch({ type: 'initial', payload: getState });
                // }
                if (isDB) {
                    const todos = await (await getTodos())?.json();
                    dispatch({ type: 'initial', payload: todos });
                } else {
                    dispatch({ type: 'initial', payload: initialState });
                }
            } catch (e) {
                // not need to catch error
                console.log(e);
            }
        })();
    }, [isDB]);
};

export default useGetInitialState;
