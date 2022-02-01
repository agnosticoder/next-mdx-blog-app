const getTodo = async (id) => {
    try {
        return await fetch(`http://localhost:8000/todos/${id}`);
    } catch (e) {
        console.error(e);
    }
};

export default getTodo;
