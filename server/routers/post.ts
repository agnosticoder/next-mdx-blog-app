import createRouter from '../createRouter';
import { z } from 'zod';
import { prisma } from '../prisma';
import filterDataToMDX from '../../lib/dataFilterToMDX';
import { TRPCError } from '@trpc/server';

const postRouter = createRouter()
    //create
    .mutation('create', {
        meta: {
            hasAuth: true,
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
                            id,
                        },
                    },
                },
            });
        },
    })
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
    })
    // update
    .mutation('update', {
        meta: {
            hasAuth: true,
        },
        input: z.object({
            update: z.object({
                content: z.string(),
                isDone: z.boolean(),
            }),
            createdAt: z.string(),
        }),
        resolve: async ({ input, ctx }) => {
            const {createdAt, update} = input;
            //Todo: Change it to find by id
            const post = await prisma.post.findFirst({
                where: {
                    createdAt,
                },
            });

            if(!post) throw new TRPCError({code: 'BAD_REQUEST', message: 'Post not found'});
            return await prisma.post.update({
                data: {
                    content: update.content,
                },
                where: {
                    id: post.id,
                },
            });

        }
    })
    .mutation('toggle', {
        meta: {
            hasAuth: true,
        },
        input: z.object({
            createdAt: z.string(),
            isDone: z.boolean(),
        }),
        resolve: async ({ input, ctx }) => {
            const {createdAt, isDone} = input;
            const post = await prisma.post.findFirst({
                where: {
                    createdAt,
                },
            });

            if (!post) throw new TRPCError({code: 'BAD_REQUEST', message: 'Post not found'}); 
            return await prisma.post.update({
                data: {
                    isDone,
                },
                where: {
                    id: post.id,
                },
            });
        }
    })
    .mutation('like', {
        meta: {
            hasAuth: true,
        },
        input: z.object({
            isLike: z.boolean(),
            postId: z.number(),
            userId: z.number().or(z.undefined()),
        }),
        resolve: async ({ input, ctx }) => {
        const {isLike, postId, userId} = input;

        const user = await prisma.user.findUnique({
            where:{
                id: userId
            }
        });
        if(!user) throw new TRPCError({code: 'BAD_REQUEST', message: 'User not found'});

        const post = await prisma.post.findUnique({
            where:{
                id: postId
            }
        });
        if(!post) throw new TRPCError({code: 'BAD_REQUEST', message: 'Post not found'});

        let result;
        if (isLike) {
            return await prisma.post.update({
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
        } else {
            return await prisma.post.update({
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
        }
        }
    })
    // delete
    .mutation('delete', {
        meta: {
            hasAuth: true,
        },
        input: z.object({
            postId: z.number(),
        }),
        resolve: async ({ input, ctx }) => {
            const userId = ctx.session.user?.id;
            const postId = input.postId;
            //* find post from DB using postId
            const post = await prisma.post.findUnique({
                where: {
                    id: postId,
                },
            });
            //* return if not post found
            if (!post) throw new TRPCError({code: 'BAD_REQUEST', message: 'post not found'});

            //* return if id don't match post's autherId return
            if (userId !== post.autherId) throw new TRPCError({code: 'UNAUTHORIZED', message: 'unauthorized'});

            return await prisma.post.delete({
                where: {
                    id: post.id,
                },
            });
        },
    });



export default postRouter;
