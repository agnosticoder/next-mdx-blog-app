import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { trpc } from '../utils/trpc';

type SignupInputs = {
    name: string;
    email: string;
    password: string;
};

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupInputs>();
    const {mutate, error, data: user} = trpc.useMutation(['user.signup']);

    const onSignup = ({name, email, password}:SignupInputs) => {
        mutate({name, email, password});
    };

    return (
        <div className="container">
            <h1>Sign Up Pal!</h1>
            <form onSubmit={handleSubmit(onSignup)}>
                <div>
                    <input
                        {...register('name', { required: true })}
                        type="text"
                        placeholder="Name"
                    />
                    {errors.name && <span>Name is required</span>}
                </div>
                <div>
                    <input
                        {...register('email', { required: { value: true, message: 'Email is required' },  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email is invalid' } })}
                        type="text"
                        placeholder="Email"
                    />
                    {errors.email && <span>Email is required</span>}
                </div>
                <div>
                    <input
                        {...register('password', { required: {value: true, message: 'Required'}, minLength: {value: 8, message: 'Password must be at least 8 characters'}})}
                        type="password"
                        placeholder="Password"
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <button type="submit">Sign Up</button>
                {error && (
                    <pre>
                        {error.message}
                        <Link href="/login">
                            <a className="nav-link"> login</a>
                        </Link>
                    </pre>
                )}
                {error?.data?.code === 'BAD_REQUEST' && <div>{error.message}</div>}
                {user && <div>{JSON.stringify(user, null, 2)}</div>}
            </form>
        </div>
    );
};

export default Signup;
