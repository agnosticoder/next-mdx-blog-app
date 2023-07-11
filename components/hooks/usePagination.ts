import { useEffect, useState } from 'react';
import useInView from './useInView';
import { FetchPaginatedPostsProps, PaginationPosts } from '../../lib/post';
import { fetchPaginatedPostsAction } from '../../app/appDir/_actions';

const usePagination = ({initialPosts}:{initialPosts: PaginationPosts}) => {
    const [fetching, setFetching] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const {inView, elementRef} = useInView({threshold: 1});
    const [pages, setPages] = useState([initialPosts]);
    const posts = pages.flatMap(page => page); 
    const lastCursor = posts[posts.length - 1].id;

     
    const loadMore = async ({cursor}: FetchPaginatedPostsProps) => {
        if (!fetching && hasNextPage) {
            try {
                setFetching(true)
                const data = await fetchPaginatedPostsAction({cursor})
                setPages((prev) => [...prev, data]);
                if(data.length === 0) setHasNextPage(false)
            } finally {
                setFetching(false);
            }
        }
    };

    useEffect(() => {
        if(inView && hasNextPage){
            loadMore({cursor: lastCursor});
        }
    }, [hasNextPage, inView, lastCursor])

    return {posts, elementRef, fetching, hasNextPage};
}

export default usePagination;