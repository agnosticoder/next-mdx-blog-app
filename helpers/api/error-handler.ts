import { NextApiResponse } from "next";

interface ErrorHandlerProps {
    err: string | unknown,
    res: NextApiResponse
}

const errorHandler = ({ err, res }: ErrorHandlerProps) => {
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
    //todo: In actual we log the server error to some DB where we can review these later
    //* if err is of type Error
    if (err instanceof Error) {
        console.log({err});
        return res.status(500).json({ serverErr: err.message });
    }
    //* any other error
    console.log({err});
};

export default errorHandler;
