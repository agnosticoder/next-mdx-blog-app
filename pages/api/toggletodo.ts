import { NextApiRequest, NextApiResponse } from 'next';
import errorHandler from '../../helpers/api/error-handler';
import prisma from '../../lib/getPrisma';
import { ToggleTodoProps } from '../../lib/toggleTodo';
import { withSessionRoute } from '../../lib/withSession';

const toggleTodo = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log('toggling todo api route');
        const { isDone, createdAt }:ToggleTodoProps = req.body;
        console.log(isDone, createdAt);

        if (createdAt) {
            const post = await prisma.post.findFirst({
                where: {
                    createdAt,
                },
            });

            if (!post) throw 'Something went wrong, please try again after some time';
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
    } catch (err) {
        errorHandler({ err, res });
    }
};

export default withSessionRoute(toggleTodo);
