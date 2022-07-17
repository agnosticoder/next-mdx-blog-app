import Link from 'next/link';
import { trpc } from '../utils/trpc';
import { useForm } from 'react-hook-form';

type LoginInputs = {
    email: string;
    password: string;
};

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>();
    const { mutate, error, data: user } = trpc.useMutation(['user.login']);

    const onSignin = ({ email, password }: LoginInputs) => {
        mutate({ email, password });
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSignin)}>
                <div>
                    <input {...register('email', { required: true })} type="text" placeholder="Email" />
                    {errors.email && <span>Email is required</span>}
                </div>
                <div>
                    <input {...register('password', { required: true })} type="password" placeholder="Password" />
                    {errors.password && <span>Password is required</span>}
                </div>
                <button type="submit">Login</button>
                {error && (
                    <pre>
                        {error.message}
                        <Link href="/signup">
                            <a className="nav-link"> Signup</a>
                        </Link>
                    </pre>
                )}
                {error?.data?.code === 'BAD_REQUEST' && <div>{error.message}</div>}
                {user && <div>{JSON.stringify(user, null, 2)}</div>}
            </form>
        </div>
    );
};

export default Login;
