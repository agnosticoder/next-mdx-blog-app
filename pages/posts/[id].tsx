import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import MDXComponents from '../../components/MDXComponents';
import { trpc } from '../../utils/trpc';

const Post = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const utils = trpc.useContext();
    const { data: user } = trpc.useQuery(['user.get'], { ssr: false });
    const { data: post } = trpc.useQuery(['post.get', { postId: id }], { ssr: false });

    const { mutate } = trpc.useMutation(['post.like'], {
        onSuccess: (data) => {
            utils.invalidateQueries(['post.get', { postId: id }]);
        },
    });

    const onLike = ({ postId, userId }: { postId: string; userId: string }) => {
        mutate({ isLike: true, postId, userId });
    };

    const onUnlike = ({ postId, userId }: { postId: string; userId: string }) => {
        mutate({ isLike: false, postId, userId });
    };

    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold mb-4">{post?.title}</h1>
            </div>
            <div className="bg-stone-200 text-stone-800 post-shadow mb-3 py-3 px-10 rounded-lg border-[1px] border-black">
                {post && <MDXRemote {...post.mdxString} components={MDXComponents as any} />}
            </div>
            {/* //Todo: Hook up the logic */}
            <div className="mb-32">
                {user && post ? (
                    <div className="flex gap-2 items-center">
                        {post && post.likedBy.length > 0 ? (
                            post.likedBy.find(({ id }) => id === user.id) ? (
                                <button key={post?.id} onClick={() => onUnlike({ postId: post.id, userId: user.id })}>
                                    <AiFillHeart size={30} className="text-red-500" />
                                </button>
                            ) : (
                                <button onClick={() => onLike({ postId: post.id, userId: user.id })}>
                                    <AiOutlineHeart size={30} className="text-red-500/70" />
                                </button>
                            )
                        ) : (
                            <button onClick={() => onLike({ postId: post.id, userId: user.id })}>
                                <AiOutlineHeart size={30} className="text-red-500/70" />
                            </button>
                        )}
                        <span className="text-sm">{post._count.likedBy}</span>
                    </div>
                ) : (
                    <div className="flex gap-2 items-center">
                        <Link href="/login" passHref>
                                <AiOutlineHeart size={30} className="text-red-500/70" />
                        </Link>
                        <span className="text-sm">{post?._count.likedBy}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Post;
