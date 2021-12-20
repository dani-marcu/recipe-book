import mongoose from 'mongoose'
import User from "../../src/models/user.mjs";
import jwt from "jsonwebtoken";

export const userOneId = new mongoose.Types.ObjectId()
export const userOne = {
    _id: userOneId,
    email: 'mike@example.com',
    password: 'parola!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, 'thisismysecret')
    }]
}

export const userTwoId = new mongoose.Types.ObjectId()
export const userTwo = {
    _id: userTwoId,
    email: 'jess@example.com',
    password: 'parola!',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, 'thisismysecret')
    }]
}

export const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
}


