import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps, NextApiHandler, NextApiRequest} from 'next';

export const { NODE_ENV = 'develoment', PASSWORD = 'secret', NAME = 'mdx-notes-app' } = process.env;
const IN_PROD = NODE_ENV === 'production';

const LOGIN_SESS_OPTIONS = {
    cookieName: NAME,
    password: PASSWORD,
    cookieOptions: {
        secure: IN_PROD,
        httpOnly: IN_PROD,
        // domain,
        // encode,
        // expires,
        // maxAge,
        // path,
        // sameSite,
    },
    // ttl
};

declare module 'iron-session' {
    interface IronSessionData {
        user?: {
            id: number;
        };
    }
}


export const withSessionRoute = (handler:NextApiHandler) => {
    return withIronSessionApiRoute(handler, LOGIN_SESS_OPTIONS);
};

export const withSessionSsr = (handler:GetServerSideProps) => {
    return withIronSessionSsr(handler, LOGIN_SESS_OPTIONS);
};
