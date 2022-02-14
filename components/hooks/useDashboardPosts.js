import { useState, useEffect } from 'react';

const fetchPosts = async ({cursor, setIsLoading, setHasMore}) => {
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

const useDashboardPosts = () => {
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [cursor, setCursor] = useState();
    const [posts, setPosts] = useState([]);

    console.log({hasMore});

    const onLoadMore = () => {
        setCursor(posts[posts.length - 1].id);
    }

    useEffect(()=> {
        fetchPosts({cursor, setIsLoading, setHasMore}).then(p => {
            setPosts(prev => [...prev, ...p]);
        })
    }, [cursor])

    return [posts, onLoadMore, isLoading, hasMore];
};

export default useDashboardPosts;
