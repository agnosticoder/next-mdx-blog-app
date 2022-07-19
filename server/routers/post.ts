import createRouter from '../createRouter';
import { z } from 'zod';
import { prisma } from '../prisma';
import filterDataToMDX from '../../lib/dataFilterToMDX';
import { TRPCError } from '@trpc/server';

const postRouter = createRouter()
    // read
    .query('dashboard', {
        input: z.object({
            cursor: z.number().optional(),
        }),
        resolve: async ({ input }) => {
            const cursor = input.cursor;
            // let posts;
            if (typeof cursor !== 'undefined') {
                const posts = await prisma.post.findMany({
                    select: {
                        content: true,
                        createdAt: true,
                        likedBy: { select: { id: true, email: true, name: true } },
                        id: true,
                        isDone: true,
                    },
                    take: 4,
                    skip: 1,
                    cursor: { id: Number(cursor) },
                });
                return await filterDataToMDX(posts);
            } else {
                const posts = await prisma.post.findMany({
                    select: {
                        content: true,
                        createdAt: true,
                        likedBy: { select: { id: true, email: true, name: true } },
                        id: true,
                        isDone: true,
                    },
                    take: 4,
                });
                return await filterDataToMDX(posts);
            }
            // const serializedData = await filterDataToMDX(posts);
            // if (serializedData) return res.status(200).send({ posts: serializedData });
            // return res.status(400).send({ err: 'Something went wrong' });
        },
    })
    .query('userPosts', {
        resolve: async ({ ctx }) => {
            const id = ctx.session.user?.id;
            if (!id) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You are not logged in' });

            const posts = await prisma.post.findMany({
                where: {
                    autherId: id,
                },
                include: { _count: { select: { likedBy: true } }, likedBy: { select: { id: true } } },
            });

            const serializedPosts = await filterDataToMDX(posts);
            return {
                props: {
                    posts,
                },
            };
        },
    });


export default postRouter;
