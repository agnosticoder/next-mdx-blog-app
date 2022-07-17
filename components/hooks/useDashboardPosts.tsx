import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import client from '../../utils/client';

interface FetchPostsProps{
    cursor?: number,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setHasMore: Dispatch<SetStateAction<boolean>>
}

const fetchPosts = async ({cursor, setIsLoading, setHasMore}: FetchPostsProps) => {
    try {
        setIsLoading(true);
        const posts = await client.query('post.dashboard', {cursor})
        // const res = await fetch(`/api/getposts/${cursor}`);
        // const {posts}:{posts: Post[]} = await res.json();
        setIsLoading(false);
        if(posts.length === 0) setHasMore(false);
        if (posts) return posts;
    } catch (err) {
        console.warn({ err });
        setIsLoading(false);
    }
};

export interface Post{
    content: MDXRemoteSerializeResult,
    createdAt: string,
    id: number,
    likedBy: {name:string, id: number, email: string}[]
    isDone: boolean
}

const useDashboardPosts = () => {
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [cursor, setCursor] = useState<number>();
    const [posts, setPosts] = useState<Post[]>([]);

    const onLoadMore = () => {
        setCursor(posts[posts.length - 1].id);
    }

    useEffect(()=> {
        fetchPosts({cursor, setIsLoading, setHasMore}).then(p => {
            if(!p) return;
            setPosts(prev => [...prev, ...p]);
        })
    }, [cursor])

    return [posts, onLoadMore, isLoading, hasMore] as const;
};

export default useDashboardPosts;
