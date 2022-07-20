import { MDXRemote } from "next-mdx-remote";
import { Post } from "./hooks/useDashboardPosts";
// import styles from '../styles/modules/TodoItem.module.scss';
import { FaRocket } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";
import LikeButton from "./LikeButton";
import MDXComponents from './MDXComponents';

interface DashboardPostsProps {
    dposts: Post[],
    user: {id: string} | undefined,
    hasUser: boolean,
    setRef: Dispatch<SetStateAction<HTMLDivElement | null | undefined>>
}

const DashboardPosts = ({ user, hasUser, dposts, setRef }: DashboardPostsProps) => {
    console.log({ dposts });
    return (
        <div>
            {dposts.map((todo, i) => {
                if (dposts.length === i + 1) {
                    return (
                        <div
                            className={`bg-stone-200 text-stone-800 post-shadow mb-3 pb-1 py-3 px-10 rounded-lg border-[1px] border-black`}
                            ref={setRef}
                            key={todo.id}
                        >
                            <div className="post">
                                <MDXRemote {...todo.content} components={MDXComponents as any} />
                            </div>
                            {hasUser && (
                                <span className="flex items-center">
                                    <LikeButton
                                        userId={user?.id}
                                        postId={todo.id}
                                        likedByIds={todo.likedBy.map((user) => user.id)}
                                        totalLikes={todo.likedBy.length}
                                    />
                                </span>
                            )}
                        </div>
                    );
                }
                return (
                    <div
                        className="bg-stone-200 text-stone-800 post-shadow mb-3 pb-1 py-3 px-10 rounded-lg border-[1px] border-black"
                        key={todo.id}
                    >
                        <div className="post">
                            <MDXRemote {...todo.content} components={MDXComponents as any}/>
                        </div>
                        {hasUser && (
                            <span className="flex items-center">
                                <LikeButton
                                    userId={user?.id}
                                    postId={todo.id}
                                    likedByIds={todo.likedBy.map((user) => user.id)}
                                    totalLikes={todo.likedBy.length}
                                />
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default DashboardPosts;
