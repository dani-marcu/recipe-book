import express from 'express';
import cors from 'cors';
import {RecipeService} from "./service/recipes.service.mjs";
const app = express();
const recipeService = new RecipeService();
app.use(cors());
app.use(express.json());

app.route('/api/recipes').get((req,res) => {
    res.send(recipeService.getRecipes());
})

app.route('/api/recipes').post((req,res) => {
    const error = recipeService.saveRecipe(req.body);
    if (error.length === 0){
        res.send(JSON.stringify(JSON.stringify({ OK: true })));
    } else {
        res.send(JSON.stringify(JSON.stringify({ error: error })));
    }
})

app.delete('/api/recipes/:id',(req,res) => {
    const {id} = req.params;
    const error = recipeService.deleteRecipe(id);
    if (error.length === 0){
        res.send(JSON.stringify(JSON.stringify({ OK: true })));
    } else {
        res.send(JSON.stringify(JSON.stringify({ error: error })));
    }
})

app.put('/api/recipes/:id',(req,res) => {
    const {id} = req.params;
    const error = recipeService.updateRecipe(id,req.body);
    if (error.length === 0){
        res.send(JSON.stringify(JSON.stringify({ OK: true })));
    } else {
        res.send(JSON.stringify(JSON.stringify({ error: error })));
    }
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});


