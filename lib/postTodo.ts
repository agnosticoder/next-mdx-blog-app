export interface PostTodoProps{
    content: string,
    createdAt: string,
    isDone: boolean
}

const postTodo = async (todo: PostTodoProps) => {
    try {
        return await fetch('/api/posttodo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
    } catch (err) {
        console.log({err});
    }
};

export default postTodo;
