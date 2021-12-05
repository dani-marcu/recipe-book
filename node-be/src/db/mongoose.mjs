import mongoose from 'mongoose';


await mongoose.connect(
    'mongodb://127.0.0.1:27017/recipe-book-api',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
