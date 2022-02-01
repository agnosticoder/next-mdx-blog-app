import { useState, useEffect } from 'react';
import getTodos from '../../lib/getTodos';

const useIsDB = () => {
    const [isDB, setIsDB] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                const res = await getTodos();
                if (res.status === 200) {
                    setIsDB(true);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return { isDB };
};

export default useIsDB;
