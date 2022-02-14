import prisma from '../lib/getPrisma';
import App from '../components/App';
// import getTodos from '../lib/getTodos';
import filterDataToMDX from '../lib/dataFilterToMDX';
import { withSessionSsr } from '../lib/withSession';

export default function Notes({ posts }) {
    console.log(posts);
    return (
        <div>
            <div className="container">
                <App posts={posts} />
            </div>
        </div>
    );
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
    const id = req.session?.user?.id;
    let posts = [];

    if (id) {
        const data = await prisma.post.findMany({
            where: {
                autherId: id,
            },
        });

        if (data?.length) {
            posts = await filterDataToMDX(data);
            return {
                props: {
                    posts,
                },
            };
        }

        return {
            props: {
                posts: data,
            },
        };
    }

    return {
        notFound: true,
    };
});
