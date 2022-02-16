import { useRouter } from 'next/router';

const logout = async () => {
    const res = await fetch('/api/logout');
    const { user, message } = await res.json();
    if (!user) return message;
    throw new Error('Something went wrong');
};

const Logout = () => {
    const router = useRouter();

    const onLogout = () => {
        logout()
            .then((res) => {
                console.log(res);
                router.push('/login');
            })
            .catch((err) => console.log(err?.message));
    };

    return (
        <div>
            <button onClick={onLogout} type="button">
                Logout
            </button>
        </div>
    );
};

export default Logout;
