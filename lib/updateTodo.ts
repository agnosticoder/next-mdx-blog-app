export interface UpdateTodoProps {
    update: {
        isDone: boolean,
        content: string
    },
    createdAt: string
}

const updateTodo = async ({update, createdAt}: UpdateTodoProps) => {
    try {
        return await fetch('/api/updatetodo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ update, createdAt }),
        });
    } catch (err) {
        console.log({err});
    }
};

export default updateTodo;
