import express from "express";
import Recipe from "../models/recipe.mjs";
import {RecipeService} from "../service/recipes.service.mjs";

const recipeService = new RecipeService();

const recipesRouter = new express.Router()

recipesRouter.route('/api/recipes').get(async (req, res) => {
    try {
        const recipes = await recipeService.getRecipes(req.query);
        res.status(200).send(recipes);
    } catch (error) {
        res.status(500).send(error.message);
    }

})

recipesRouter.route('/api/recipes').post(async (req, res) => {
    try {
        const newRecipe = await recipeService.saveRecipe(req.body);
        res.status(201).send(newRecipe);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

recipesRouter.delete('/api/recipes/:id', async (req, res) => {
    try {
        const recipe = await recipeService.deleteRecipe(req.params.id);
        if (!recipe) {
            return res.status(404).send('Recipe not found!');
        }
        res.status(200).send(recipe);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

recipesRouter.put('/api/recipes/:id', async (req, res) => {
    try {
        const updatedRecipe = await recipeService.updateRecipe(req.params.id, req.body);
        if (!updatedRecipe) {
            return res.status(404).send()
        }
        res.send(updatedRecipe)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

export {recipesRouter as default}
