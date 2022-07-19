import { useRouter } from 'next/router';
import { trpc } from '../utils/trpc';

const logout = async () => {
    const res = await fetch('/api/logout');
    const { user, message } = await res.json();
    if (!user) return message;
    throw new Error('Something went wrong');
};

const Logout = () => {
    const router = useRouter();
    const utils = trpc.useContext();
    const {mutate: logout} = trpc.useMutation(['user.logout'], {
        onSuccess: () => {
            router.push('/login');
        }
    });

    return (
        <div>
            <button onClick={() => logout()} type="button">
                Logout
            </button>
        </div>
    );
};

export default Logout;
