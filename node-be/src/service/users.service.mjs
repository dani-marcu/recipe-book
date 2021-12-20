import User from "../models/user.mjs";
import jwt, {decode} from "jsonwebtoken";

export class UsersService {
    async saveUser(userData) {
        const user = new User(userData);
        await user.save()
        const token = await this.generateAuthToken(user);
        const expiresIn = (decode(token)).exp;
        return {user, token, expiresIn}
    }

    async logOut(user, userToken) {
        user.tokens = user.tokens.filter((token) => {
            return token.token !== userToken;
        })
        await user.save();
    }

    async logOutAll(user) {
        user.tokens = [];
        await user.save();
    }

    async updateUser(newUserData, user) {
        const updates = Object.keys(newUserData)
        const allowedUpdates = ['name', 'email', 'password', 'age']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        if (!isValidOperation) {
            throw new Error('Invalid updates!');
        }
        updates.forEach((update) => user[update] = newUserData[update]);
        await user.save();
        return user;
    }

    async logIn(userData) {
        const user = await User.findByCredentials(userData.email, userData.password);
        const token = await this.generateAuthToken(user);
        return {user, token};
    }

    async generateAuthToken(user){
        const token = jwt.sign({_id: user._id.toString()}, 'thisismysecret', {expiresIn: '1h'});
        user.tokens = user.tokens.concat({token});
        await user.save();
        return token;
    }

}
