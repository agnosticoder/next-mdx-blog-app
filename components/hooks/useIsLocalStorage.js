import { useState, useEffect } from 'react';

const useIsLocalStorage = () => {
    const [isLocal, setIsLocal] = useState(false);

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            setIsLocal(true);
        }
    }, []);

    return { isLocal };
};

export default useIsLocalStorage;
