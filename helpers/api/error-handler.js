const errorHandler = (err, res) => {
    if (typeof err === 'string') {
        //* custom application error
        const is404 = err.toLowerCase().endsWith('not found');
        const statusCode = is404 ? 404 : 400;
        return res.status(statusCode).json({ err });
    }
    // console.log(typeof err);
    // return await res.status(200).json({err});
    // console.log({ err });
    // console.dir(err.message);
    // //* cannot stringify node error object
    // const message = JSON.stringify(err);

    // console.log(err instanceof Error);

    //todo: write code to handle login unathorization errors
    // if(err.name === 'UnauthorizedError')

    //* if it is node related error
    //* console.error server errors: only important for developer not client
    // res.status(500).json({error: error.message});



    //* log full err to the server and send back message to client
    console.error(err);
    return res.status(500).json({ serverErr: err.message });
};

export default errorHandler;
