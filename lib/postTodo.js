const postTodo = async (todo) => {
    try {
        return await fetch('http://localhost:8000/todos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
    } catch (e) {
        console.error(e);
    }
};

export default postTodo;
