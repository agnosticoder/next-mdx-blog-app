export interface LikePostProps{
    isLike: boolean,
    userId: number | undefined,
    postId: number
}

const likePost = async ({...props}: LikePostProps) => {
    try {
        const res = await fetch('/api/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...props}),
        });

        // const result = await res.json();
        // console.log({result});
        return res;
    } catch (err) {
        console.warn({err});
    }
}

export default likePost;