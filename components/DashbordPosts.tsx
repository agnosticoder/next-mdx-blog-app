import { MDXRemote } from "next-mdx-remote";
import { Post } from "./hooks/useDashboardPosts";
// import styles from '../styles/modules/TodoItem.module.scss';
import { FaRocket } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";
import styles from '../styles/modules/DashboardPosts.module.scss';
import LikeButton from "./LikeButton";

interface DashboardPostsProps {
    dposts: Post[],
    user: {id: number} | undefined,
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
                        <div className={styles.container} ref={setRef} key={todo.createdAt}>
                            <MDXRemote {...todo.content} />
                            {hasUser && (
                            <span className={styles.buttons}>
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
                    <div className={styles.container} key={todo.createdAt}>
                        <MDXRemote {...todo.content} />
                        {hasUser && (
                            <span className={styles.buttons}>
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
