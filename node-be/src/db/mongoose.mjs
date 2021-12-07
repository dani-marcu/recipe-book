import mongoose from 'mongoose';

export async function connectToDb() {
    await mongoose.connect(
        'mongodb://127.0.0.1:27017/recipe-book-api',
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
}
