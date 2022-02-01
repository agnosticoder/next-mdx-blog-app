import { useState } from 'react';
import Store from '../components/store/store';
import Test from './Test';

const [CountProvider, useStore] = Store;

/* -------------------------------- index.js -------------------------------- */
const init = 7;

const Index = () => (
    <div>
        <CountProvider init={init}>
            <DirectChild />
        </CountProvider>
    </div>
);

/* ----------------------------- store.Count.js ----------------------------- */
const useCount = () => {
    const [count] = useStore();
    return count;
};

const useIncrement = () => {
    const [, setCount] = useStore();

    const onIncrement = () => {
        setCount((prevState) => prevState + 1);
    };
    return onIncrement;
};

const useDecrement = () => {
    const [, setCount] = useStore();

    const onDecrement = () => {
        setCount((prevState) => prevState - 1);
    };
    return onDecrement;
};

/* ------------------------------- Counter.js ------------------------------- */
const Counter = () => {
    console.log('Counter');
    const [input, setInput] = useState('');
    const count = useCount();
    const onIncrement = useIncrement();
    const onDecrement = useDecrement();

    return (
        <div>
            <h1>Implementation of GlobalState with Context API</h1>
            <div>
                Count:
                {count}
            </div>
            <button type="button" onClick={onIncrement}>
                Increment
            </button>
            <button type="button" onClick={onDecrement}>
                Decrement
            </button>
            <input
                type="text"
                placeholder="Type Something..."
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
            />
        </div>
    );
};

const DirectChild = () => {
    console.log('DirectChild');
    return (
        <div>
            <Counter />
            <hr />
            <Test />
        </div>
    );
};

export default Index;
