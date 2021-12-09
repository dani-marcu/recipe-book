import express from 'express';
import cors from 'cors';

const app = express();
import recipesRouter from "./routers/recipes-router.mjs";
import {connectToDb} from "./db/mongoose.mjs";
import usersRouter from "./routers/users-router.mjs";

connectToDb();

app.use(cors());
app.use(express.json());
app.use(recipesRouter);
app.use(usersRouter);

app.listen(3005, () => {
    console.log('Server is up on port 3005.')
});


