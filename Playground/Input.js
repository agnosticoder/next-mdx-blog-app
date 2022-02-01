import Store from '../components/store/store';

const [InputProvider, useStore] = Store;

const init = '';

const Index = () => {
    console.log('Index');

    return (
        <div>
            <InputProvider init={init}>
                <App />
            </InputProvider>
        </div>
    );
};

const App = () => {
    console.log('Input App');
    const [input, setInput] = useStore();

    return (
        <div>
            <h1>I can import new store from store.js and use anywhere I need</h1>
            <hr />
            <input value={input} placeholder="Type Bro!" onChange={(e) => setInput(e.currentTarget.value)} />
        </div>
    );
};

export default Index;
