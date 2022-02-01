const updateTodo = async (todo, id) => {
    try {
        return await fetch(`http://localhost:8000/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
    } catch (e) {
        console.error(e);
    }
};

export default updateTodo;
