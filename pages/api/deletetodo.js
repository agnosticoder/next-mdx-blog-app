import prisma from '../../lib/getPrisma';
import { withSessionRoute } from '../../lib/withSession';
import errorHandler from '../../helpers/api/error-handler';


const deleteTodo = async (req, res) => {
    const id = req.session?.user?.id;
    const postId = req.body.id;

    //* if no id or postId return
    if (!id || !postId) return errorHandler('post not found', res);

    try {
        //* find post from DB using postId
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });
        //* return if not post found
        if (!post) return errorHandler('post not found', res);

        //* return if id don't match post's autherId return
        if (id !== post.autherId) return errorHandler('unauthorized', res);
        const result = await prisma.post.delete({
            where: {
                id: post.id,
            },
        });
        console.log({ result });
        res.status(200).json({message: 'sucessfully deleted'});
    } catch (err) {
        errorHandler(err, res);
    } finally{
        prisma.$disconnect();
    }
};

export default withSessionRoute(deleteTodo);
