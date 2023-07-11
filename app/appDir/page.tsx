import Posts from '../../components/Posts';
import { getUserAction, fetchPaginatedPostsAction } from './_actions';

// const Dashboard = ({ posts }) => {
const Dashboard = async  () => {
    const posts = await  fetchPaginatedPostsAction({});
    return (
        <div>
            <Posts posts={posts}/>
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
