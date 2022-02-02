import prisma from '../../lib/getPrisma';

const signup = async (req, res) => {
    const user = req.body;

    try {
        const result = await prisma.user.create({
            data: {
                ...user,
            },
        });
        res.json(result);
    } catch (e) {
        res.json(e);
    }
};

export default signup;
