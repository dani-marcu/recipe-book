import express from "express";
import {RecipeService} from "../service/recipes.service.mjs";
import {auth} from "../middleware/auth.mjs";

const recipeService = new RecipeService();

const recipesRouter = new express.Router()

recipesRouter.get('/api/recipes', auth, async (req, res) => {
    try {
        const recipes = await recipeService.getRecipes(req.query,req.user);
        res.status(200).send(recipes);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

recipesRouter.post('/api/recipes', auth, async (req, res) => {
    try {
        const newRecipe = await recipeService.saveRecipe(req);
        res.status(201).send(newRecipe);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

recipesRouter.delete('/api/recipes/:id',auth, async (req, res) => {
    try {
        const recipe = await recipeService.deleteRecipe(req.params.id,req.user);
        if (!recipe) {
            return res.status(404).send('Recipe not found!');
        }
        res.status(200).send(recipe);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

recipesRouter.put('/api/recipes/:id',auth, async (req, res) => {
    try {
        const updatedRecipe = await recipeService.updateRecipe(req.params.id, req.body, req.user);
        if (!updatedRecipe) {
            return res.status(404).send()
        }
        res.send(updatedRecipe)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

export {recipesRouter as default}
