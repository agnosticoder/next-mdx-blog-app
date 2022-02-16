import { NextApiHandler } from 'next';
import { withSessionRoute } from '../../lib/withSession';

const logout:NextApiHandler = async (req, res) => {
    await req.session.destroy();
    res.status(200).json({ user: null, message: 'successsfully logged out' });
};

export default withSessionRoute(logout);
