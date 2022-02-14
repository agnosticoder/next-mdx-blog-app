import prisma from '../../lib/getPrisma';
import errorHandler from '../../helpers/api/error-handler';
import bcrypt from 'bcryptjs';

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    let user;
    if (name && email && password) {
        //todo: can do some validation here as well and throw errors
        try {
            const isEmail = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            if(isEmail) return errorHandler('This email already exist', res);

            const hash = await bcrypt.hash(password, 10);
            user = await prisma.user.create({
                data: { name, email, password: hash },
            });
            user = {name, email};

            res.status(201).json({user, message: 'Congratulations, you have successfully created the account. Welcome to the family!'});
        } catch (err) {
            errorHandler(err, res);
        } finally {
            await prisma.$disconnect();
        }
    }
};

export default signup;
