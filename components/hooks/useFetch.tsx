import { useState, useEffect } from 'react';

const fetchData = async (url:string) => {
    const res = await fetch(url);
    if (res.status === 200) {
        const data = await res.json();
        return data;
    }
    return undefined;
};


const useFetch = (url:string) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const res = await fetchData(url);
            setData(res);
            setIsLoading(false);
        })().catch(e => console.error(e));
    }, [url])

    return [isLoading, data];
};

export default useFetch;