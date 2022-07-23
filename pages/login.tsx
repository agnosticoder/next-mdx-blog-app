import { trpc } from '../utils/trpc';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { withSessionSsr } from '../lib/withSession';

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
    const router = useRouter();
    const utils = trpc.useContext();
    const { mutate, error, data: user } = trpc.useMutation(['user.login'], {
        onSuccess: () => {
            utils.invalidateQueries(['user.get']);
            router.push('/');
        },
    });

    const onSignin = ({ email, password }: LoginInputs) => {
        mutate({ email, password });
    };

    return (
        <div className="flex justify-center items-center mt-32">
            <div className="w-96 mx-auto bg-stone-200 p-4 rounded-lg drop-shadow">
                <h1 className="text-xl font-bold text-center mb-6">Login</h1>
                <form onSubmit={handleSubmit(onSignin)}>
                    <div className="mb-6 relative">
                        <input
                            {...register('email', { required: true })}
                            type="text"
                            className="w-full p-2 rounded"
                            placeholder="Email"
                        />
                        {errors.email && (
                            <span className="absolute -bottom-5 left-0 text-red-500 text-sm">Required</span>
                        )}
                    </div>
                    <div className="mb-6 relative">
                        <input
                            {...register('password', { required: true })}
                            type="password"
                            className="w-full p-2 rounded"
                            placeholder="Password"
                        />
                        {errors.password && (
                            <span className="absolute -bottom-5 left-0 text-red-500 text-sm">Required</span>
                        )}
                    </div>
                    <button
                        className="w-full bg-teal-600 p-2 hover:bg-teal-800 rounded text-stone-100 mb-4 drop-shadow"
                        type="submit"
                    >
                        Login
                    </button>
                    {error?.data?.code === 'BAD_REQUEST' && <div className="">{error.message}</div>}
                </form>
            </div>
        </div>
    );
};

export default Login;

export const getServerSideProps = withSessionSsr(async ({ req }) => {
    const user = req.session.user?.id;
    if(user){
        return {
            redirect: {
                destination: '/',
            },
            props: {
                user,
            }
        }
    }
    return {
        props: {user: null}
    }
});
