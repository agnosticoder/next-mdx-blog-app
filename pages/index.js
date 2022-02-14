import { MDXRemote } from 'next-mdx-remote';
import useDashboardPagination from '../components/hooks/useDashboardPagination';
import useDashboardPosts from '../components/hooks/useDashboardPosts';
import filterDataToMDX from '../lib/dataFilterToMDX';
import prisma from '../lib/getPrisma';

const Dashboard = ({ posts }) => {
    //todo: this component will render the posts and also implement verical pagination
    const [dposts, onLoadMore, isLoading, hasMore] = useDashboardPosts();
    const { setRef } = useDashboardPagination(onLoadMore, hasMore, isLoading);

    console.log({ isLoading });

    return (
        <div className="container">
            <h1>This will be our dashboard</h1>
            {dposts.map((todo, i) => {
                if (dposts.length === i + 1) {
                    return (
                        <div style={{ backgroundColor: '#999' }} ref={setRef} key={todo.createdAt}>
                            <MDXRemote {...todo.content} />
                        </div>
                    );
                }
                return (
                    <div style={{ fontSize: '18px' }} key={todo.createdAt}>
                        <MDXRemote {...todo.content} />
                    </div>
                );
            })}
            {isLoading && hasMore && <div>Loading...</div>}
            {!hasMore && <pre style={{ color: 'green' }}>No more posts...</pre>}
        </div>
    );
};

export default Dashboard;




























export const getServerSideProps = async () => {

    let posts = await prisma.post.findMany({
        select:{
            content: true,
            createdAt: true
        }
    });

    if(posts.length){
        posts = await filterDataToMDX(posts);
    }

    //todo: I want to show all post on dashboard with excerpt of each post
    //? I need to create different excert field in DB to store the excerpt
    //todo: serialize mdx data with serialize function from mdx-remote
    //todo: passs it to the Dashboard component
    //todo: I need to add vertical pagination if the posts are two many


    return {
        props:{
            posts
        }
    }
};
