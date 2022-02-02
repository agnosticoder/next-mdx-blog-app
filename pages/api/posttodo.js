import prisma from '../../lib/getPrisma';
import { withSessionRoute } from '../../lib/withSession';

const postTodo = async (req, res) => {
    const post = req.body;
    const user = req.session;
    // console.log(user);
    // console.log(post);

    // todo: validate user before posting post
    if (post) {
        const result = await prisma.post.create({
            data: {
                ...post,
                author: {
                    connect: {
                        id: user.user.id,
                    },
                },
            },
        });

        res.status(201).json({ result });
    }
    res.end();
};

export default withSessionRoute(postTodo);
