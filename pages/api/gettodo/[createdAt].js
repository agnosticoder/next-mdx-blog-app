import prisma from '../../../lib/getPrisma';
import { withSessionRoute } from '../../../lib/withSession';

const getTodo = async (req, res) => {
    const id = req.session?.user?.id;
    const { createdAt } = req.query;
    // console.log({ id }, { createdAt });

    // todo: validate user before getting post
    if (id && createdAt) {
        const post = await prisma.post.findFirst({
            where: {
                createdAt,
            },
        });
        if (post && id === post.autherId) {
            res.status(200).json(post);
        }
    }
    res.end();
};

export default withSessionRoute(getTodo);
