import prisma from '../lib/getPrisma';
import App from '../components/App';
// import getTodos from '../lib/getTodos';
import filterDataToMDX from '../lib/dataFilterToMDX';
import { withSessionSsr } from '../lib/withSession';
import { Todo } from '../components/TodoItem';
import { GetServerSideProps } from 'next';

export default function Notes({ posts }:{posts: Todo[]}) {
    return (
        <div>
            <div className="container">
                <App posts={posts} />
            </div>
        </div>
    );
}

export const getServerSideProps:GetServerSideProps = withSessionSsr(async ({ req }) => {
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

        prisma.$disconnect();

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
