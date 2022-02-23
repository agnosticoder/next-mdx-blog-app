import { NextApiHandler, NextApiRequest } from "next";
import errorHandler from "../../helpers/api/error-handler";
import prisma from "../../lib/getPrisma";
import { LikePostProps } from "../../lib/likePost";

interface ExtendedApiRequest extends NextApiRequest{
    body: LikePostProps
}

const like:NextApiHandler = async (req:ExtendedApiRequest, res) => {
    try{
        const {isLike, postId, userId} = req.body;
        //todo: add or remove the current user in the post's likedBy field
        const user = await prisma.user.findUnique({
            where:{
                id: userId
            }
        });
        if(!user) throw 'User not found';

        const post = await prisma.post.findUnique({
            where:{
                id: postId
            }
        });
        if(!post) throw 'Post not found';

        let result;
        if (isLike) {
            result = await prisma.post.update({
                where: {
                    id: postId,
                },
                data: {
                    likedBy: { connect: { id: userId } },
                },
                select: {
                    autherId: true,
                },
            });
            console.log({ result });
            res.send({ message: 'Liked', result, onSuccess: true });
        } else {
            result = await prisma.post.update({
                where: {
                    id: postId,
                },
                data: {
                    likedBy: { disconnect: { id: userId } },
                },
                select: {
                    autherId: true,
                },
            });
            console.log({ result });
            res.send({ message: 'Disliked', result, onSuccess: true });
        }

    }catch(err){
        errorHandler({err, res});
    }finally{
        prisma.$disconnect();
    }
}

export default like;