import { Switch } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { RiRocket2Fill } from 'react-icons/ri';
import styles from '../styles/modules/LikeButton.module.scss';
import { useLikePost } from './store/todoStore';

interface LikeButtonProps {
    userId: number | undefined;
    postId: number;
    likedByIds: number[];
    totalLikes: number;
}

const LikeButton = ({ userId, postId, likedByIds, totalLikes }: LikeButtonProps) => {
    const [isLike, setIsLike] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const likePost = useLikePost();

    //* set isLike to true if likedByIds contains userId
    useEffect(() => {
        if (userId) {
            setIsLike(likedByIds.includes(userId));
        }
        if (totalLikes) {
            setLikesCount(totalLikes);
        }
    }, []);

    const onLike = async () => {
        const { res, result } = await likePost({ isLike: !isLike, postId, userId });
        if (res?.ok && result?.onSuccess) {
            if (isLike) {
                setIsLike(!isLike);
                setLikesCount(likesCount - 1);
            } else {
                setIsLike(!isLike);
                setLikesCount(likesCount + 1);
            }
            console.log({ res }, result.message);
        }
    };

    // useEffect(() => {
    //     likePost({ userId, postId, isLike }).then((res) => console.log(res));
    // }, [isLike, postId, userId]);

    return (
        <>
            <Switch checked={isLike} onChange={onLike} className={styles.switch}>
                {isLike ? (
                    <span title='Unlike'>
                        <RiRocket2Fill className={styles.likeIcon} />
                    </span>
                ) : (
                    <span title='Like'>
                        <RiRocket2Fill className={styles.noLike} />
                    </span>
                )}
            </Switch>
            <span className={styles.likeCount}>{`(${likesCount})`}</span>
        </>
    );
};

export default LikeButton;
