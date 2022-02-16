import { NextApiRequest, NextApiResponse } from 'next';
import errorHandler from '../../helpers/api/error-handler';
import prisma from '../../lib/getPrisma';
import { withSessionRoute } from '../../lib/withSession';

const postTodo = async (req:NextApiRequest, res:NextApiResponse) => {
    const post = req.body;
    // const user = req.session;
    const { user } = req.session;
    // console.log(user);
    // console.log(post);

    // todo: validate user before posting post
    try {
        if (post && user?.id) {
            const result = await prisma.post.create({
                data: {
                    ...post,
                    author: {
                        connect: {
                            id: user.id,
                        },
                    },
                },
            });

            res.status(201).json({ result });
        }
        res.end();
    } catch (err) {
        errorHandler({err, res});
    }
};

export default withSessionRoute(postTodo);
