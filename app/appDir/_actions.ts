'use server';

import { FetchPaginatedPostsProps, getUser, fetchPaginatedPosts } from '../../lib/post';

export const fetchPaginatedPostsAction = async (paginatedPostsProps: FetchPaginatedPostsProps) => {
    return await fetchPaginatedPosts(paginatedPostsProps);
}

export const getUserAction = async () => {
    return await getUser();
}