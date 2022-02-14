const deleteTodo = async (id) => {
    try {
        let res =  await fetch('/api/deletetodo', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        console.log({res});
        res = await res.json();
        const {err, serverErr, message} = res;
        if (err) return { err };
        //* cannot display server error on UI
        if (serverErr) return console.warn({serverErr});
        if (message) return { message, status:200 };

    } catch (err) {
        //todo: client side error is to be handled client side
        console.warn({err});
    }
};

export default deleteTodo;
