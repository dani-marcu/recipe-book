import {RecipeValidator} from "../validator/recipe.validator.mjs";

export class RecipeService{
    constructor(){
        this.ingredients = []
        this.recipes = []
        this.recipeValidator = new RecipeValidator()
    }

    saveRecipe(recipe){
        var msg = this.recipeValidator.validate(recipe);
        if (msg.length === 0){
            this.recipes.push(recipe);
        }
        return msg;
    }

    getRecipes(){
        return this.recipes.slice();
    }

    deleteRecipe(index){
        var msg = ''
        if(typeof this.recipes[index] === 'undefined'){
            msg = 'Provided index does not exist!'
        } else {
            this.recipes.splice(index,1);
        }
        return msg;
    }

    updateRecipe(index,newRecipe){
        var msg = this.recipeValidator.validate(newRecipe);
        if (msg.length === 0){
            if (typeof this.recipes[index] === 'undefined'){
                msg += 'Provided index does not exist!'
            } else {
                this.recipes[index] = newRecipe;
            }
        }
        return msg;
    }
}


