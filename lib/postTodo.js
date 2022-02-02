const postTodo = async (todo) => {
    try {
        return await fetch('/api/posttodo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
    } catch (e) {
        throw new Error(e);
    }
};

export default postTodo;
