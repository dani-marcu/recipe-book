import {RecipeValidator} from "../validator/recipe.validator.mjs";
import Recipe from "../models/recipe.mjs";

export class RecipeService {
    constructor() {
        this.ingredients = []
        this.recipes = []
        this.recipeValidator = new RecipeValidator()
    }

    saveRecipe(request) {
        const recipe = new Recipe({
            ...request.body,
            owner: request.user._id
        });
        return recipe.save();
    }

    async getRecipes(query, user) {
        const id = '"' + user._id + '"';
        if (query.search && query.minIngredients && query.maxIngredients && !isNaN(query.minIngredients) && !isNaN(query.maxIngredients)) {
            return Recipe.find(
                {$where: "this.ingredients.length >= " + query.minIngredients + " && this.ingredients.length <= " + query.maxIngredients + " && this.owner == " + id}
            ).fuzzySearch(query.search);
        }
        if (query.search) {
            return Recipe.find(
                {$where: "this.owner == " + id}).fuzzySearch(query.search);
        }
        if (query.minIngredients && query.maxIngredients && !isNaN(query.minIngredients) && !isNaN(query.maxIngredients)) {
            return Recipe.find(
                {$where: "this.owner == " + id + " && this.ingredients.length >= " + query.minIngredients + " && this.ingredients.length <= " + query.maxIngredients}
            )
        }
        await user.populate('recipes').execPopulate();
        return user.recipes;
    }

    async deleteRecipe(id, user) {
        return Recipe.findOneAndDelete({_id: id, owner: user._id});
    }

    async updateRecipe(id, newRecipe, user) {
        const updates = Object.keys(newRecipe)
        const allowedUpdates = ['name', 'description', 'imagePath', 'ingredients']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        if (!isValidOperation) {
            throw new Error('Invalid updates!');
        } else {
            const recipe = await Recipe.findOne({_id: id, owner: user._id});
            if (!recipe){
                return null;
            }
            updates.forEach((update) => recipe[update] = newRecipe[update])
            await recipe.save();
            return recipe;
        }
    }
}


