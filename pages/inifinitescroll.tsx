import { MDXRemote } from 'next-mdx-remote';
import { useEffect, useRef, useState } from 'react';
import useInView from '../components/hooks/useInView';
import MDXComponents from '../components/MDXComponents';
import { trpc } from '../utils/trpc';

const InifiniteScroll = () => {
    const { inView, elementRef } = useInView({threshold: 1});
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = trpc.useInfiniteQuery(['post.paginated', {}], {
        getNextPageParam: (lastPage) => {
            console.log('lastPage', lastPage);
            return lastPage[lastPage.length - 1]?.id || undefined;
        },

    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView]);

    return (
        <div>
            {data?.pages.map((page, i) =>
                page.map((post, j) => (
                    <div key={j}>
                        <MDXRemote {...post.content as any} components={MDXComponents as any} />
                    </div>
                ))
            )}
            <div ref={elementRef}>
                {isFetchingNextPage ? 'Loading...' : hasNextPage ? 'Loading...' : 'No more posts...'}
            </div>
        </div>
    );
};

export default InifiniteScroll;