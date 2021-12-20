import mongoose from 'mongoose';

export async function connectToDb() {
    await mongoose.connect(
        process.env.MONGODB_URL,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
}
