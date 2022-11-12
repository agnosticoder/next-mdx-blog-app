import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { withSessionSsr } from '../lib/withSession';
import { trpc } from '../utils/trpc';

type SignupInputs = {
    name: string;
    email: string;
    password: string;
};

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupInputs>();
    const router = useRouter();
    const utils = trpc.useContext();
    const { mutate, error, data: user } = trpc.useMutation(['user.signup'], {
        onSuccess: () => {
            utils.invalidateQueries(['user.get']);
            router.push('/');
        },
    });

    const onSignup = ({ name, email, password }: SignupInputs) => {
        mutate({ name, email, password });
    };

    // function return true if password contains at least one number, one letter(both upper and lowercase), one special character and is at least 8 characters long
    //Todo: implement this function later
    const validatePassword = (value: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(value);
    }


    return (
        <div className="flex justify-center items-center mt-32">
            <div className="w-96 mx-auto bg-stone-200 p-4 rounded-lg drop-shadow">
                <h1 className="text-xl font-bold text-center mb-6">Sign up</h1>
                <form onSubmit={handleSubmit(onSignup)}>
                    <div className="mb-6 relative">
                        <input
                            {...register('name', { required: true })}
                            type="text"
                            placeholder="Name"
                            className="w-full p-2 rounded"
                        />
                        {errors.name && (
                            <span className="absolute -bottom-5 left-0 text-red-500 text-sm">Required</span>
                        )}
                    </div>
                    <div className="mb-6 relative">
                        <input
                            {...register('email', {
                                required: { value: true, message: 'Required' },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Invalid Email',
                                },
                            })}
                            type="text"
                            placeholder="Email"
                            className="w-full p-2 rounded"
                        />
                        {errors.email && (
                            <span className="absolute -bottom-5 left-0 text-red-500 text-sm">
                                {errors.email.message}
                            </span>
                        )}
                    </div>
                    <div className="mb-6 relative">
                        <input
                            {...register('password', {
                                required: { value: true, message: 'Required' },
                                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                            })}
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 rounded"
                        />
                        {errors.password && (
                            <span className="absolute -bottom-5 left-0 text-red-500 text-sm">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 p-2 hover:bg-teal-800 rounded text-stone-100 mb-4 drop-shadow"
                    >
                        Sign Up
                    </button>
                    {error?.data?.code === 'BAD_REQUEST' && (
                        <div>
                            <span className='inline-block mr-2'>{error.message}</span>
                            <Link href="/login" className="text-teal-700 hover:underline inline-block"> login
                            </Link>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Signup;

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
