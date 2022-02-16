import { FormEvent, useState } from 'react';
import signup from '../lib/signup';
import Link from 'next/link';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');

    const onSignup = (e:FormEvent) => {
        e.preventDefault();

        //todo: client side password validation
        signup({ name, email, password })
            .then((res) => {
                if(!res) return;
                const { user = '', message = '', err = ''} = res;
                setError(err);
                setUser(user);
                setMessage(message);
            })
            .catch((err) => {
                console.warn({err});
            });
    };

    return (
        <div className="container">
            <h1>Sign Up Pal!</h1>
            <form onSubmit={onSignup}>
                <div>
                    <input
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                        type="text"
                        placeholder="Name"
                    />
                </div>
                <div>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        type="text"
                        placeholder="Email"
                    />
                </div>
                <div>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <button type="submit">Sign Up</button>
                {error && (
                    <pre>
                        {error}
                        <Link href="/login">
                            <a className="nav-link"> login</a>
                        </Link>
                    </pre>
                )}
                {message && <div>{message}</div>}
                {user && <div>{JSON.stringify(user, null, 2)}</div>}
            </form>
        </div>
    );
};

export default Signup;
