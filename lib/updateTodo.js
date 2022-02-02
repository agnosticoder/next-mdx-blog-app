const updateTodo = async (todo, createdAt) => {
    try {
        return await fetch('/api/updatetodo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo, createdAt }),
        });
    } catch (e) {
        throw new Error(e);
    }
};

export default updateTodo;
