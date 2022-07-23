import Link from 'next/link';
import { useState } from 'react';
import { trpc } from '../../utils/trpc';

const Dashboard = () => {
    const [postStatus, setPostStatus] = useState<'POST' | 'DRAFT'>('POST');
    const utils = trpc.useContext();
    const {mutate: publish} = trpc.useMutation(['post.toggle'],{
        onSuccess: (data) => {
            utils.invalidateQueries(['post.userPosts']);
        }
    });
    const { data } = trpc.useQuery(['post.userPosts'], { ssr: false });
    const posts = postStatus === 'POST' ? data?.filter((post) => post.isDone) : data?.filter((post) => !post.isDone);

    return (
        <div>
            <h1 className="text-3xl bold mb-6">Dashboard</h1>
            <div className="sm:grid sm:grid-cols-4 sm:gap-2">
                <div className="list-none col-span-1">
                    <button
                        onClick={() => setPostStatus('POST')}
                        className="text-teal-800 bg-stone-100 w-full p-2 rounded mb-2 hover:bg-stone-300"
                    >
                        Published Posts
                    </button>
                    <button
                        onClick={() => setPostStatus('DRAFT')}
                        className="text-teal-800 bg-stone-100 w-full p-2 rounded mb-2 hover:bg-stone-300"
                    >
                        Drafts
                    </button>
                </div>
                <div className="col-span-3">
                    {posts?.map((post) => (
                        <div key={post.id}>
                            <div className="grid grid-cols-4 border-[1px] border-stone-300/50 mb-2 bg-stone-100 rounded-md p-2">
                                <div className="p-4 rounded col-span-3">{post.title}</div>
                                <div className="col-span-1">
                                    <div className="h-full flex gap-4 font-extralight text-sm justify-end items-center">
                                        <div>
                                            <Link href={`/user/post/edit/${post.id}`}>
                                                <a className="inline-block hover:bg-stone-200/80 px-2 py-1 rounded">Edit</a>
                                            </Link>
                                            {!post.isDone && (
                                                <button className="ml-2 bg-teal-700 hover:bg-teal-800 text-stone-100 px-2 py-1 rounded"
                                                onClick={() => {
                                                    publish({isDone: true, postId: post.id});
                                                }}>
                                                    Publish
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;