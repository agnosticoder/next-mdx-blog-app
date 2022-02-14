import { useState, useEffect } from 'react';

const useDashboardPagination = (onLoadMore, hasMore, isLoading) => {
    const [ref, setRef] = useState();

    useEffect(() => {
        //* don't change the page is the titles are already loading
        if(isLoading) return;
        const observer = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting && hasMore) {
                    console.log('inter');
                    onLoadMore();
                }
            },
            { threshold: 1 }
        );

        if (ref) {
            observer.observe(ref);
        }

        return () => {
            if (ref) {
                observer.unobserve(ref);
                observer.disconnect();
            }
        };
    }, [ref, hasMore, onLoadMore, isLoading]);

    return { ref, setRef };

};

export default useDashboardPagination;



