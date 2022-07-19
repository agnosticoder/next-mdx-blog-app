import App from '../components/App';
import ClientOnly from '../components/ClientOnly';

export default function Notes() {
    return (
        <ClientOnly>
            <div className="container">
                <App />
            </div>
        </ClientOnly>
    );
}
