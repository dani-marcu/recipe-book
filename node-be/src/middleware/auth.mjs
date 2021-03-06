import jwt from "jsonwebtoken";
import User from "../models/user.mjs";

export const auth = async (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,'thisismysecret');
        const user = await User.findOne({_id:decoded._id, 'tokens.token': token});
        const expirationTime = decoded.exp;
        if(!user || Date.now() >= expirationTime * 1000 ){
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next()
    } catch(error) {
        res.status(401).send({error: 'Please authenticate!'})
    }
}
