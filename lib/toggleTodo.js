const toggleTodo = async (isDone, createdAt) => {
    try {
        return await fetch('/api/toggletodo', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isDone, createdAt }),
        });
    } catch (e) {
        throw new Error(e);
    }
};

export default toggleTodo;
