const getTodos = async (todo) => {
    try {
        return await fetch('http://localhost:8000/todos/');
    } catch (e) {
        console.error(e);
    }
};

export default getTodos;
