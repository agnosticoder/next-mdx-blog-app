import router from 'next/router';
import { useEffect } from 'react';
import useFetch from './useFetch';


export interface User {
    user: {
        id: number
    }
}

//* redirect to login when not autherized
//* redirect to dashboard when logged in
export default function useUser({ redirectTo = '', redirectIfFound = false } = {}) {
    const [isLoading, data, error] = useFetch<User>('/api/user');

    //* useEffect will run cleanup function when it umounts or when it run again
    //* but that most probably will be used in async function inside useEffect with dependency
    useEffect(() => {
        if (isLoading) return;
        // if no redirect needed, just return (example: already on /dashboard)
        // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet

        if (!data || !redirectTo) return;
        if (
            // If redirectTo is set, redirect if the user was not found.
            (redirectTo && !redirectIfFound && !data?.user?.id) ||
            // If redirectIfFound is also set, redirect if the user was found
            (data?.user?.id && redirectTo && redirectIfFound)
        ) {
            router.push(redirectTo);
        }
    }, [data, redirectTo, redirectIfFound, isLoading]);

    return { data, error };
}