export interface ToggleTodoProps {
    isDone: boolean,
    createdAt: string
}


const toggleTodo = async ({isDone, createdAt}:ToggleTodoProps) => {
    try {
        return await fetch('/api/toggletodo', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isDone, createdAt }),
        });
    } catch (err) {
        console.log({err});
    }
};

export default toggleTodo;
