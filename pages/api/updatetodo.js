import prisma from '../../lib/getPrisma';
import { withSessionRoute } from '../../lib/withSession';

const updateTodo = async (req, res) => {
    console.log('updating todo');
    const { todo, createdAt } = req.body;
    console.log(todo, createdAt);

    if (todo && createdAt) {
        const post = await prisma.post.findFirst({
            where: {
                createdAt,
            },
        });

        const update = await prisma.post.update({
            data: {
                content: todo.content,
            },
            where: {
                id: post.id,
            },
        });

        res.status(200).json(update);
    }

    res.end();
};

export default withSessionRoute(updateTodo);
