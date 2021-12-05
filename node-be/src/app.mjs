import express from 'express';
import cors from 'cors';

const app = express();
import recipesRouter from "./routers/recipes-router.mjs";
import './db/mongoose.mjs'

app.use(cors());
app.use(express.json());
app.use(recipesRouter);

app.listen(3005, () => {
    console.log('Server is up on port 3005.')
});


