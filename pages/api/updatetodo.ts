import { NextApiRequest, NextApiResponse } from 'next';
import errorHandler from '../../helpers/api/error-handler';
import prisma from '../../lib/getPrisma';
import { UpdateTodoProps } from '../../lib/updateTodo';
import { withSessionRoute } from '../../lib/withSession';

const updateTodo = async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        console.log('updating todo');
        const { update, createdAt }: UpdateTodoProps = req.body;

        if (update && createdAt) {
            const post = await prisma.post.findFirst({
                where: {
                    createdAt,
                },
            });

            if(!post) throw 'Something Went Wrong, Please try again after some time';
            const updated = await prisma.post.update({
                data: {
                    content: update.content,
                },
                where: {
                    id: post.id,
                },
            });

            res.status(200).json({update: updated});
        }

        res.end();
    } catch (err) {
        errorHandler({err, res});
    }
};

export default withSessionRoute(updateTodo);
