import { useState } from 'react';
import signup from '../lib/signup';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignup = (e) => {
        e.preventDefault();

        signup({ name, email, password })
            .then((res) => console.log(res))
            .catch((err) => console.err({ err }));
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
            </form>
        </div>
    );
};

export default Signup;
