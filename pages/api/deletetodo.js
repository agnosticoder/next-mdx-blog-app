import { PrismaClient } from '@prisma/client';
import { withSessionRoute } from '../../lib/withSession';

const prisma = new PrismaClient();

const deleteTodo = async (req, res) => {
    const id = req.session?.user?.id;
    const { createdAt } = req.body;
    console.log({ id }, { createdAt });

    if (id && createdAt) {
        const post = await prisma.post.findFirst({
            where: {
                createdAt,
            },
        });

        if (post && id === post.autherId) {
            const result = await prisma.post.delete({
                where: {
                    id: post.id,
                },
            });
            console.log({ result });
            res.status(200).json(result);
        }
    }
};

export default withSessionRoute(deleteTodo);
