import prisma from "../../../lib/getPrisma";
import filterDataToMDX from "../../../lib/dataFilterToMDX";
import { NextApiHandler } from "next";

const getPosts:NextApiHandler = async (req, res) => {
    const { cursor } = req.query;
    console.log({ cursor }, typeof cursor);
    try {
        let posts;
        if (cursor !== 'undefined') {
            posts = await prisma.post.findMany({
                select: {
                    content: true,
                    createdAt: true,
                    id: true,
                },
                take: 4,
                skip: 1,
                cursor: {id: Number(cursor)}
            });
        } else {
            posts = await prisma.post.findMany({
                select: {
                    content: true,
                    createdAt: true,
                    id: true,
                },
                take: 4,
            });
        }
        const serializedData = await filterDataToMDX(posts);
        if (serializedData) return res.status(200).send({ posts: serializedData });
        return res.status(400).send({ err: 'Something went wrong' });
    } catch (err) {
        console.log({ err });
    } finally {
        prisma.$disconnect();
    }
};

export default getPosts;
