import bcryptjs from 'bcryptjs';
import errorHandler from '../../helpers/api/error-handler';
import prisma from '../../lib/getPrisma';
import { withSessionRoute } from '../../lib/withSession';

const login = async (req, res) => {
    const { email, password } = req.body;

    //* return if no email or password
    if (!email || !password) return errorHandler('please provide email and password', res);
    try {
        //*check if user exist by email
        let user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        //* if not user by email not found
        if (!user) return errorHandler('Email not found', res);

        //* get hash form database
        const hash = user.password;
        const isMatch = await bcryptjs.compare(password, hash);

        if(!isMatch) return errorHandler('Your password is incorrect, change it to email or password incorrect', res);

        //* setup the session
        // todo: don't pass user email and password in session
        req.session.user = {
            id: user.id,
        };

        user = {name: user.name, email};

        await req.session.save();
        return res.status(200).json({ user: user, message: 'successfully logged in' });
    } catch (err) {
        errorHandler(err, res);
    }finally{
        prisma.$disconnect();
    }
};

export default withSessionRoute(login);
