import { NextApiHandler } from "next";
import errorHandler from "../../helpers/api/error-handler";
import { withSessionRoute } from "../../lib/withSession";

const user: NextApiHandler = (req, res) => {
    try {
        const { user } = req.session;
        if(!user) throw 'You must be logged in';

        res.status(200).json({user});
    } catch (err) {
        errorHandler({ err, res });
    }
};

export default withSessionRoute(user);

