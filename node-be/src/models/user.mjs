import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import Recipe from "./recipe.mjs";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String
        }
    }]
});

UserSchema.virtual('recipes', {
    ref: 'Recipe',
    localField: '_id',
    foreignField: 'owner'
})

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new Error('Unable to login!');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login!');
    }
    return user;
}

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

UserSchema.pre('remove', async function (next) {
    const user = this;
    await Recipe.deleteMany({owner: user._id});
    next();
})

const User = mongoose.model('User', UserSchema);
export {User as default}
