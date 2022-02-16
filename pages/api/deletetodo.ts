import prisma from '../../lib/getPrisma';
import { withSessionRoute } from '../../lib/withSession';
import errorHandler from '../../helpers/api/error-handler';
import { NextApiRequest, NextApiResponse } from 'next';


const deleteTodo = async (req:NextApiRequest, res:NextApiResponse) => {
    const id = req.session?.user?.id;
    const postId = req.body.id;

    //* if no id or postId return
    if (!id || !postId) throw 'post not found';

    try {
        //* find post from DB using postId
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });
        //* return if not post found
        if (!post) throw 'post not found';

        //* return if id don't match post's autherId return
        if (id !== post.autherId) throw 'unauthorized';
        const result = await prisma.post.delete({
            where: {
                id: post.id,
            },
        });
        console.log({ result });
        res.status(200).json({message: 'sucessfully deleted'});
    } catch (err) {
        errorHandler({err, res});
    } finally{
        prisma.$disconnect();
    }
};

export default withSessionRoute(deleteTodo);
