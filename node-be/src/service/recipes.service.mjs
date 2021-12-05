import {RecipeValidator} from "../validator/recipe.validator.mjs";
import Recipe from "../models/recipe.mjs";

export class RecipeService {
    constructor() {
        this.ingredients = []
        this.recipes = []
        this.recipeValidator = new RecipeValidator()
    }

    saveRecipe(recipeData) {
        const recipe = new Recipe(recipeData);
        return recipe.save();
    }

    getRecipes() {
        return Recipe.find({});
    }

    deleteRecipe(id) {
        return Recipe.findByIdAndDelete(id);
    }

    updateRecipe(id, newRecipe) {
        const updates = Object.keys(newRecipe)
        const allowedUpdates = ['name', 'description', 'imagePath', 'ingredients']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        if (!isValidOperation) {
            throw new Error('Invalid updates!');
        } else {
            return Recipe.findByIdAndUpdate(id, newRecipe, {new: true, runValidators: true})
        }
    }
}


