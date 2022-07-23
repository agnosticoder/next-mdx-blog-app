import { MDXRemote } from 'next-mdx-remote';
import { useRouter } from 'next/router';
import { AiOutlineHeart } from 'react-icons/ai';
import LikeButton from '../../components/LikeButton';
import MDXComponents from '../../components/MDXComponents';
import { trpc } from '../../utils/trpc';

const Post = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const { data: post } = trpc.useQuery(['post.get', { postId: id }]);
    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold mb-4">{post?.title}</h1>
            </div>
            <div className="bg-stone-200 text-stone-800 post-shadow mb-3 py-3 px-10 rounded-lg border-[1px] border-black">
                {post && <MDXRemote {...(post.content as any)} components={MDXComponents as any} />}
            </div>
            {/* //Todo: Hook up the logic */}
            <div className='mb-32'>
                <div className="flex gap-2 items-center">
                    <button>
                        <AiOutlineHeart size={30} className="text-red-500/70" />
                    </button>
                    <span className="">12</span>
                </div>
            </div>
            {/* {hasUser && (
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
    );
};

export default Post;
