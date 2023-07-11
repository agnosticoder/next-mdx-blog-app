import prisma from './prisma';
import {z} from 'zod';

export const FetchPaginatedPostsSchema = z.object({
    cursor: z.string().nullish(),
});
export type FetchPaginatedPostsProps = z.infer<typeof FetchPaginatedPostsSchema>;
export type PaginationPosts = Awaited<ReturnType<typeof fetchPaginatedPosts>>

export const fetchPaginatedPosts = async ({ cursor }: FetchPaginatedPostsProps) => {
    return await prisma.post.findMany({
        where: {
            isDone: true,
        },
        select: {
            author: true,
            createdAt: true,
            likedBy: { select: { id: true } },
            id: true,
            isDone: true,
            title: true,
            _count: { select: { likedBy: true } },
        },
        take: 4,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
            createdAt: 'desc',
        },
    });
};

export const getUser = async () => {
    return await prisma.user.findFirst();
}