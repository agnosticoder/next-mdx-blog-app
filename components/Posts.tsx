'use client'

import { CgProfile } from 'react-icons/cg';
import { FetchPaginatedPostsProps, PaginationPosts } from '../lib/post';
import useInView from './hooks/useInView';
import { format } from 'date-fns';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { tr } from 'date-fns/locale';
import { fetchPaginatedPostsAction } from '../app/appDir/_actions';
import usePagination from './hooks/usePagination';

const Posts = ({posts: initialPosts}:{posts:PaginationPosts}) => {
    const {posts, elementRef, hasNextPage, fetching} = usePagination({initialPosts})
    return (
        <div>
                {posts.map((post) => (
                    <div key={post.id}>
                        <div className="bg-stone-200 text-stone-800 post-shadow mb-10 py-3 px-10 rounded-lg border-[1px] border-black">
                            <div className="mb-4 flex items-center gap-2">
                                <CgProfile size={30} />
                                <div className="text-xs">
                                    <div>{post.author.name}</div>
                                    <div>{format(post.createdAt, 'dd MMM yyyy')}</div>
                                </div>
                            </div>
                            <Link href={`/posts/${post.id}`} className="block text-3xl font-semibold mb-2">
                                {post.title}
                            </Link>
                            {/* {user ? (
                                <div className="flex gap-2 items-center">
                                    {post.likedBy.length > 0 ? (
                                        post.likedBy.find(({ id }) => id === user.id) ? (
                                            <button
                                                key={post.id}
                                                onClick={() => onUnlike({ postId: post.id, userId: user.id })}
                                            >
                                                <AiFillHeart size={20} className="text-red-500" />
                                            </button>
                                        ) : (
                                            <button onClick={() => onLike({ postId: post.id, userId: user.id })}>
                                                <AiOutlineHeart size={20} className="text-red-500/70" />
                                            </button>
                                        )
                                    ) : (
                                        <button onClick={() => onLike({ postId: post.id, userId: user.id })}>
                                            <AiOutlineHeart size={20} className="text-red-500/70" />
                                        </button>
                                    )}
                                    <span className="text-sm">{post._count.likedBy}</span>
                                </div>
                            ) : (
                                <div className="flex gap-2 items-center">
                                    <Link href="/login">
                                        <AiOutlineHeart size={20} className="text-red-500/70" />
                                    </Link>
                                    <span className="text-sm">{post._count.likedBy}</span>
                                </div>
                            )} */}
                            {/* <div className="post">
                                <MDXRemote {...(post.content as any)} components={MDXComponents as any} />
                            </div>
                            {hasUser && (
                                <span className="flex items-center">
                                    <LikeButton
                                        userId={user?.id}
                                        postId={post.id}
                                        likedByIds={post.likedBy.map((user) => user.id)}
                                        totalLikes={post.likedBy.length}
                                    />
                                </span>
                            )} */}
                        </div>
                    </div>
                ))}
            <div ref={elementRef} className="text-center">
                {fetching ? 'Loading...' : hasNextPage ? 'Loading...' : 'No more posts...'}
            </div>
        </div>
    );
}

export default Posts;