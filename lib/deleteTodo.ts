interface ServerResponse{
    err?: string,
    serverErr?: string,
    message?: string,
}

const deleteTodo = async (id: number) => {
    try {
        let res =  await fetch('/api/deletetodo', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        const result:ServerResponse = await res.json();
        const {err = '', message = '', serverErr = ''} = result;
        const status = res.status;

        if (err) return { err, message, status };
        if (message) return { err, message, status };

        //* cannot display server error on UI
        if (serverErr) return console.warn({serverErr});

    } catch (err) {
        //todo: client side error is to be handled client side
        console.warn({err});
    }
};

export default deleteTodo;
