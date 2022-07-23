import { MDXRemote } from 'next-mdx-remote';
import { useEffect } from 'react';
import useInView from '../components/hooks/useInView';
import { trpc } from '../utils/trpc';
import {CgProfile} from 'react-icons/cg';
import {AiFillHeart} from 'react-icons/ai';
import {AiOutlineHeart} from 'react-icons/ai';
import { format } from 'date-fns';
import produce from 'immer';
import Link from 'next/link';

// const Dashboard = ({ posts }) => {
const Dashboard = () => {
    const { data: user } = trpc.useQuery(['user.get'], { ssr: false });
    const { inView, elementRef } = useInView({ threshold: 1 });
    const utils = trpc.useContext();
    const { data: posts, fetchNextPage, hasNextPage, isFetchingNextPage } = trpc.useInfiniteQuery(
        ['post.dashboard', {}],
        {
            getNextPageParam: (lastPage) => lastPage[lastPage.length - 1]?.id || undefined,
        }
    );
    const { mutate } = trpc.useMutation(['post.like'], {
        onSuccess: (data) => {
            utils.invalidateQueries(['post.dashboard']);
        },
    });

    const onLike = ({ postId, userId }: { postId: string; userId: string }) => {
        mutate({ isLike: true, postId, userId });
    };

    const onUnlike = ({ postId, userId }: { postId: string; userId: string }) => {
        mutate({ isLike: false, postId, userId });
    };

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    return (
        <div>
            {posts?.pages.map((page, i) =>
                page.map((post) => (
                    <div key={post.id}>
                        <div className="bg-stone-200 text-stone-800 post-shadow mb-3 py-3 px-10 rounded-lg border-[1px] border-black">
                            <div className="mb-4 flex items-center gap-2">
                                <CgProfile size={30} />
                                <div className="text-xs">
                                    <div>{post.author.name}</div>
                                    <div>{format(post.createdAt, 'dd MMM yyyy')}</div>
                                </div>
                            </div>
                            <Link href={`/posts/${post.id}`}>
                                <a className="block text-3xl font-semibold mb-2">{post.title}</a>
                            </Link>
                            {user ? (
                                <div className="flex gap-2 items-center">
                                    {post.likedBy.length > 0 ? (
                                        post.likedBy.map(
                                            (u) =>
                                                u.id === user.id && (
                                                    <button
                                                        key={post.id}
                                                        onClick={() => onUnlike({ postId: post.id, userId: user.id })}
                                                    >
                                                        <AiFillHeart size={20} className="text-red-500" />
                                                    </button>
                                                )
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
                                        <a>
                                            <AiOutlineHeart size={20} className="text-red-500/70" />
                                        </a>
                                    </Link>
                                    <span className="text-sm">{post._count.likedBy}</span>
                                </div>
                            )}
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
                ))
            )}
            <div ref={elementRef} className="text-center">
                {isFetchingNextPage ? 'Loading...' : hasNextPage ? 'Loading...' : 'No more posts...'}
            </div>
        </div>
    );
};

export default Dashboard;




























// export const getServerSideProps = async () => {

//     const posts = await prisma.post.findMany({
//         select:{
//             content: true,
//             createdAt: true
//         }
//     });

//     prisma.$disconnect();

//     if (posts.length) {
//         const postsData = await filterDataToMDX(posts);
//         return {
//             props: {
//                 posts: postsData
//             },
//         };
//     }


//     //todo: I want to show all post on dashboard with excerpt of each post
//     //? I need to create different excert field in DB to store the excerpt
//     //todo: serialize mdx data with serialize function from mdx-remote
//     //todo: passs it to the Dashboard component
//     //todo: I need to add vertical pagination if the posts are two many
// };
