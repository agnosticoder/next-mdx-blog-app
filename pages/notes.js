import { PrismaClient } from '@prisma/client';
import App from '../components/Home/App';
// import getTodos from '../lib/getTodos';
import filterDataToMDX from '../lib/dataFilterToMDX';
import { withSessionSsr } from '../lib/withSession';

export default function Notes({ posts }) {
    // console.log(posts);
    return (
        <div>
            <div className="container">
                <App posts={posts} />
            </div>
        </div>
    );
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
    const prisma = new PrismaClient();
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
            posts = await Promise.all(posts);
            // console.log(posts);
            return {
                props: {
                    posts,
                },
            };
        }
    }
});