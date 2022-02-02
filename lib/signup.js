const signup = async ({ name, email, password }) => {
    const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    const result = await res.json();

    if (result?.code?.startsWith('P')) {
        throw new Error('Something went wrong on database end');
    }
    return result;
};

export default signup;
