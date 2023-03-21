import { Request, Response } from "express";

import { hashPassword, verifyPassword } from "../../lib/bcrypt";
import generateToken from "../../lib/generateToken";
import User, { IUser } from "../../modals/user";

const signup = async (req: Request, res: Response) => {
    try {
        let { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please Enter all the fields");
        }
        email = email?.toLowerCase();
        const userExists = await User.findOne({email})
        if (userExists) {
            return res.status(400).json({ message: "User already exists." });
        }
        const { hashedPassword, salt } = await hashPassword(password);
        const user = {
            name,
            email,
            password: hashedPassword,
            salt
        }
        return await User.create(user).then((data: IUser) => {
            return res.status(201).json({
                _id: data._id,
                name: data.name,
                email: data.email
            })
        }).catch((error: Error) => {
            throw error;
        });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const signin = async (req: Request, res: Response) => {
    try{
        let { email, password } = req.body;
        if ( !email || !password) {
            res.status(400);
            throw new Error("Please Enter all the fields");
        }
        email = email?.toLowerCase();
        const user = await User.findOne({email}).lean();
        if(!user){
            return res.status(404).json({message: "Email or password is incorrect."});
        }
        const isMatch = await verifyPassword(password, user.salt, user.password);
        if(!isMatch){
            return res.status(403).json({message: "Email or password is wrong."})
        }
        return res.status(200).json({
            token: generateToken(email),
            name: user.name,
            email,
            _id: user._id
        })
    } catch (err) {
        return res.status(500).json(err);
    }
}

export default {
    signup,
    signin,
}