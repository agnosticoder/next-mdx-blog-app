import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import client from '../../utils/client';

interface FetchPostsProps{
    cursor?: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setHasMore: Dispatch<SetStateAction<boolean>>
}

const fetchPosts = async ({cursor, setIsLoading, setHasMore}: FetchPostsProps) => {
    try {
        setIsLoading(true);
        const posts = await client.query('post.dashboard', {cursor})
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
    createdAt: Date,
    id: string,
    likedBy: {name:string, id: string, email: string}[]
    isDone: boolean
}

const useDashboardPosts = () => {
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [cursor, setCursor] = useState<string>();
    const [posts, setPosts] = useState<Post[]>([]);

    const onLoadMore = () => {
        setCursor(String(posts[posts.length - 1].id));
    }

    useEffect(()=> {
        fetchPosts({cursor, setIsLoading, setHasMore}).then(p => {
            if(!p) return;
            console.log('p', p);
            setPosts(prev => [...prev, ...p]);
        })
    }, [cursor])

    return [posts, onLoadMore, isLoading, hasMore] as const;
};

export default useDashboardPosts;
