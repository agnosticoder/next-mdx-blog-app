import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const login = async (email, password) => {
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        //* return either user of error from api route
        const { user, message, err, serverErr } = await res.json();

        if (err) return { err };
        //* cannot display server error on UI
        if (serverErr) return console.warn({ serverErr });
        if (user) return { user, message };
    } catch (err) {
        console.warn({err});
    }
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const onSignin = (e) => {
        e.preventDefault();

        //todo: client side password and email validation
        login(email, password)
            .then((res) => {
                const {user = '', message = '', err = ''} = res;
                setError(err);
                setUser(user);
                setMessage(message);
                // router.push('/notes');
            })
            .catch((err) => console.warn({err}));

        console.log('signing in...');
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={onSignin}>
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
                <button type="submit">Login</button>
                {error && (
                    <pre>
                        {error}
                        <Link href="/signup">
                            <a className="nav-link"> Signup</a>
                        </Link>
                    </pre>
                )}
                {message && <div>{message}</div>}
                {user && <div>{JSON.stringify(user, null, 2)}</div>}
            </form>
        </div>
    );
};

export default Login;
