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
                return await filterDataToMDX<typeof posts>(posts);
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
                return await filterDataToMDX<typeof posts>(posts);
            }
        },
    })
    .query('userPosts', {
        meta: {
            hasAuth: true,
        },
        resolve: async ({ ctx }) => {
            const id = ctx.session.user?.id;
            const posts = await prisma.post.findMany({
                where: {
                    autherId: id,
                },
                include: { _count: { select: { likedBy: true } }, likedBy: { select: { id: true } } },
            });

            return await filterDataToMDX<typeof posts>(posts);
        },
    }).mutation('create', {
        meta: {
            hasAuth: true
        },
        input: z.object({
            content: z.string(),
            createdAt: z.string(),
            isDone: z.boolean(),
        }),
        resolve: async ({ input, ctx }) => {
            const post = input;
            const id = ctx.session.user?.id;
            return await prisma.post.create({
                data: {
                    ...post,
                    author: {
                        connect: {
                            id
                        },
                    },
                },
            });
        }
    });


export default postRouter;
