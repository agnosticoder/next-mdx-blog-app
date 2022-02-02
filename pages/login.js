import { useState } from 'react';
import { useRouter } from 'next/router';

const login = async (email, password) => {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    const { user } = await res.json();
    if (user) return user;
    throw new Error('username or password incorrect');
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const onSignin = (e) => {
        e.preventDefault();

        login(email, password)
            .then((res) => router.push('/notes'))
            .catch((err) => console.log(err.message));

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
            </form>
        </div>
    );
};

export default Login;
