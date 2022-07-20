import App from '../components/App';
import ClientOnly from '../components/ClientOnly';

export default function Notes() {
    return (
        <ClientOnly>
            <App />
        </ClientOnly>
    );
}
