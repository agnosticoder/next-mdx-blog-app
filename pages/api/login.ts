import bcryptjs from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import errorHandler from '../../helpers/api/error-handler';
import prisma from '../../lib/getPrisma';
import { withSessionRoute } from '../../lib/withSession';

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { email, password } = req.body;
        //* return if no email or password
        if (!email || !password) throw 'please provide email and password';
        //*check if user exist by email
        let user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        //* if not user by email not found
        if (!user) throw 'Email not found';

        //* get hash form database
        const hash = user.password;
        const isMatch = await bcryptjs.compare(password, hash);

        if (!isMatch) throw 'Your password is incorrect, change it to email or password incorrect';

        //* setup the session
        // todo: don't pass user email and password in session
        req.session.user = {
            id: user.id,
        };

        const userData = { name: user.name, email };

        await req.session.save();
        return res.status(200).json({ user: userData, message: 'successfully logged in' });
    } catch (err) {
        console.log('hello err', err);
        errorHandler({ err, res });
    } finally {
        prisma.$disconnect();
    }
};

export default withSessionRoute(login);
