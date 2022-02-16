import { NextApiHandler } from 'next';
import errorHandler from '../../../helpers/api/error-handler';
import prisma from '../../../lib/getPrisma';
import { withSessionRoute } from '../../../lib/withSession';

const getTodo: NextApiHandler = async (req, res) => {
    try {
        const id = req.session?.user?.id;
        const { createdAt } = req.query;
        // console.log({ id }, { createdAt });

        // todo: validate user before getting post
        if (id && createdAt && typeof createdAt === 'string') {
            const post = await prisma.post.findFirst({
                where: {
                    createdAt,
                },
            });
            if (post && id === post.autherId) {
                res.status(200).json(post);
            }
        }
        throw 'Something went wrong';
    } catch (err) {
        errorHandler({ err, res });
    }
};

export default withSessionRoute(getTodo);
