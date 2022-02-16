import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface FetchPostsProps{
    cursor?: number,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setHasMore: Dispatch<SetStateAction<boolean>>
}

const fetchPosts = async ({cursor, setIsLoading, setHasMore}: FetchPostsProps) => {
    try {
        setIsLoading(true);
        const res = await fetch(`/api/getposts/${cursor}`);
        const {posts} = await res.json();
        console.log({posts});
        setIsLoading(false);
        if(posts.length === 0) setHasMore(false);
        if (posts) return posts;
    } catch (err) {
        console.warn({ err });
        setIsLoading(false);
    }
};

interface Post{
    content: MDXRemoteSerializeResult,
    createdAt: string,
    id: number
}

const useDashboardPosts = () => {
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [cursor, setCursor] = useState<number>();
    const [posts, setPosts] = useState<Post[]>([]);

    console.log({posts});

    const onLoadMore = () => {
        setCursor(posts[posts.length - 1].id);
    }

    useEffect(()=> {
        fetchPosts({cursor, setIsLoading, setHasMore}).then(p => {
            setPosts(prev => [...prev, ...p]);
        })
    }, [cursor])

    return [posts, onLoadMore, isLoading, hasMore] as const;
};

export default useDashboardPosts;
