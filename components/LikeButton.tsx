import { Switch } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { RiRocket2Fill } from 'react-icons/ri';
import { trpc } from '../utils/trpc';

interface LikeButtonProps {
    userId: string | undefined;
    postId: string;
    likedByIds: string[];
    totalLikes: number;
}

const LikeButton = ({ userId, postId, likedByIds, totalLikes }: LikeButtonProps) => {
    const [isLike, setIsLike] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const utils = trpc.useContext();
    const { mutateAsync } = trpc.useMutation(['post.like'], {
        onSuccess: () => {
            utils.invalidateQueries(['post.userPosts']);
        },
    });

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
        // const { res, result } = await likePost({ isLike: !isLike, postId, userId });
        //Todo: fix the following shit
        const post = await mutateAsync({ isLike: !isLike, postId, userId });
        if (!post) return;
        if (isLike) {
            setIsLike(!isLike);
            setLikesCount(likesCount - 1);
        } else {
            setIsLike(!isLike);
            setLikesCount(likesCount + 1);
        }
        // if (res?.ok && result?.onSuccess) {
        //     console.log({ res }, result.message);
        // }
    };

    // useEffect(() => {
    //     likePost({ userId, postId, isLike }).then((res) => console.log(res));
    // }, [isLike, postId, userId]);

    return (
        <>
            <Switch checked={isLike} onChange={onLike} className="">
                <span title="Unlike">
                    <RiRocket2Fill className={`${isLike ? 'text-red-500' : 'text-red-300'}`} />
                </span>
            </Switch>
            <span className='text-sm'>{`(${likesCount})`}</span>
        </>
    );
};

export default LikeButton;
