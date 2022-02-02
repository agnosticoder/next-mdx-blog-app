import { withSessionRoute } from '../../lib/withSession';

const logout = async (req, res) => {
    await req.session.destroy();
    res.status(200).json({ user: null, message: 'successsfully logged out' });
};

export default withSessionRoute(logout);
