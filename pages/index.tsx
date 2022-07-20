import DashboardPosts from '../components/DashbordPosts';
import useDashboardPagination from '../components/hooks/useDashboardPagination';
import useDashboardPosts from '../components/hooks/useDashboardPosts';
import useUser from '../components/hooks/useUser';

// const Dashboard = ({ posts }) => {
const Dashboard = () => {
    const { data: user, error } = useUser();
    const hasUser = !!user?.id;

    console.log('user', user);

    //todo: this component will render the posts and also implement verical pagination
    const [dposts, onLoadMore, isLoading, hasMore] = useDashboardPosts();
    const { setRef } = useDashboardPagination({ hasMore, isLoading, onLoadMore });

    console.log('index', dposts);

    return (
        <div>
            <DashboardPosts user={user} dposts={dposts} hasUser={hasUser} setRef={setRef}/>
            {isLoading && hasMore && <div>Loading...</div>}
            {!hasMore && <pre style={{ color: 'green' }}>No more posts...</pre>}
        </div>
    );
};

export default Dashboard;




























// export const getServerSideProps = async () => {

//     const posts = await prisma.post.findMany({
//         select:{
//             content: true,
//             createdAt: true
//         }
//     });

//     prisma.$disconnect();

//     if (posts.length) {
//         const postsData = await filterDataToMDX(posts);
//         return {
//             props: {
//                 posts: postsData
//             },
//         };
//     }


//     //todo: I want to show all post on dashboard with excerpt of each post
//     //? I need to create different excert field in DB to store the excerpt
//     //todo: serialize mdx data with serialize function from mdx-remote
//     //todo: passs it to the Dashboard component
//     //todo: I need to add vertical pagination if the posts are two many
// };
