import { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface FetchDataProps{
    url: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

async function fetchData<T>({ url, setIsLoading }: FetchDataProps) {
    try {
        setIsLoading(true);
        const res = await fetch(url);
        if (res.status === 200) {
            const data: T = await res.json();
            setIsLoading(false);
            return {data, err: ''};
        }

        const { err, serverErr } = await res.json();
        console.warn({ serverErr });

        setIsLoading(false);
        return {err, data: undefined};
    } catch (err) {
        console.warn({ err });
    }
};


function useFetch<T>(url:string){
    const [data, setData] = useState<T>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData<T>({ url, setIsLoading }).then((res) => {
            if (!res) return;
            const { err, data } = res;
            setData(data);
            setError(err);
        });
    }, [url]);

    return [isLoading, data, error] as const;
};

export default useFetch;