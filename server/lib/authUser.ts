import { Request, Response, NextFunction} from "express";
import User from "../modals/user";
import decryptToken from "./decryptToken";

interface CustomRequest extends Request {
    user: object
}

const authUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try{
        const userInfo = decryptToken(req.headers.authorization);
        const { email } = userInfo;
        const user = await User.findOne({email: email}, {name: 1, email: 1, _id: -1}).lean();
        req.user = user;
        next();
    }catch(err){
        return res.status(500).json({err: err.message});
    }
}

export default authUser;