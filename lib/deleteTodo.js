const deleteTodo = async (createdAt) => {
    try {
        return await fetch('/api/deletetodo', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ createdAt }),
        });
    } catch (e) {
        console.error(e);
    }
};

export default deleteTodo;
