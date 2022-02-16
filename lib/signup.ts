interface SignUpResponse {
    user: string,
    message: string,
    err: string,
    serverErr: string
}

interface SignUpProps{
    name: string,
    email: string,
    password: string
}

const signup = async ({ name, email, password }: SignUpProps) => {
    try {
        let res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const result:SignUpResponse = await res.json();

        //* return either user of error from api route
        const { user, message, err, serverErr } = result;

        //* cannot display server error on UI
        if (serverErr) console.warn({serverErr});

        return { user, message, err };

    } catch (err) {
        //todo: client side error is to be handled client side
        console.warn({err});
    }
};

export default signup;
