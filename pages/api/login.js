import { PrismaClient } from '@prisma/client';
import { withSessionRoute } from '../../lib/withSession';

const prisma = new PrismaClient();

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    console.log(req.body);

    //* get user form database
    const user = await prisma.user.findFirst({
        where: {
            email,
            password,
        },
    });

    //* setup the session
    if (user) {
        // todo: don't pass user email and password in session
        req.session.user = {
            user,
            id: user.id,
        };

        await req.session.save();
        return res.status(200).json({ user: user, message: 'successfully logged in' });
    }

    //* return null user if not found
    res.json({ user: null, message: 'email or password incorrect' });
};

export default withSessionRoute(login);
