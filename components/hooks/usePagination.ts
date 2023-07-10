import { useEffect } from 'react';
import { trpc } from '../../utils/trpc';
import useInView from './useInView';

const usePagination = () => {
    const { data: user } = trpc.useQuery(['user.get'], { ssr: false });
    const { inView, elementRef } = useInView({ threshold: 1 });
    const { data: posts, fetchNextPage, hasNextPage, isFetchingNextPage } = trpc.useInfiniteQuery(
        ['post.paginated', {}],
        {
            getNextPageParam: (lastPage) => lastPage[lastPage.length - 1]?.id || undefined,
        }
    );


    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    return {posts, user, isFetchingNextPage, hasNextPage, elementRef};
}

export default usePagination;