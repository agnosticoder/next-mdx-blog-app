import { useEffect, useState } from 'react';
import Pagination from './components/Pagination';
import Posts from './components/Posts';

const fetchData = async (url) => {
    const res = await fetch(url);
    const postsData = await res.json();
    return postsData;
};

const Play = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const postsPerPage = 10;

    useEffect(() => {
        (async () => {
            setLoading(true);
            const postsData = await fetchData('https://jsonplaceholder.typicode.com/posts?_limit=82');
            setPosts(postsData);
            setLoading(false);
        })();
    }, []);

    // Get current posts
    const indexOfLastPost = (currentPageIndex + 1) * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div>
            <Pagination
                posts={posts}
                postsPerPage={postsPerPage}
                setCurrentPageIndex={setCurrentPageIndex}
                currentPageIndex={currentPageIndex}
            />
            <Posts loading={loading} posts={currentPosts} />
        </div>
    );
};

export default Play;
