import express from 'express';
import cors from 'cors';
import recipesRouter from "./routers/recipes-router.mjs";
import {connectToDb} from "./db/mongoose.mjs";
import usersRouter from "./routers/users-router.mjs";

export function initApp(){
    connectToDb();
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(recipesRouter);
    app.use(usersRouter);
    return app;
}
