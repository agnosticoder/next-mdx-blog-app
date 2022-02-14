const signup = async ({ name, email, password }) => {
    try {
        let res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        res = await res.json();

        //* return either user of error from api route
        const { user, message, err, serverErr } = res;

        if (err) return { err };
        //* cannot display server error on UI
        if (serverErr) return console.warn({serverErr});
        if (user) return { user, message };

    } catch (err) {
        //todo: client side error is to be handled client side
        console.warn({err});
    }
};

export default signup;
