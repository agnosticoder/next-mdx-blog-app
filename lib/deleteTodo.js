const deleteTodo = async (id) => {
    try {
        return await fetch(`http://localhost:8000/todos/${id}`, {
            method: 'DELETE',
        });
    } catch (e) {
        console.error(e);
    }
};

export default deleteTodo;
