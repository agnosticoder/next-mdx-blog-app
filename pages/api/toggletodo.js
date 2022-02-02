import prisma from '../../lib/getPrisma';
import { withSessionRoute } from '../../lib/withSession';

const toggleTodo = async (req, res) => {
    console.log('toggling todo api route');
    const { isDone, createdAt } = req.body;
    console.log(isDone, createdAt);

    if (createdAt) {
        const post = await prisma.post.findFirst({
            where: {
                createdAt,
            },
        });

        const update = await prisma.post.update({
            data: {
                isDone,
            },
            where: {
                id: post.id,
            },
        });

        res.status(200).json(update);
    }

    res.end();
};

export default withSessionRoute(toggleTodo);
