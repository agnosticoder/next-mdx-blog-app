const toggleTodo = async (completed, id) => {
    try {
        return await fetch(`http://localhost:8000/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed }),
        });
    } catch (e) {
        console.error(e);
    }
};

export default toggleTodo;
