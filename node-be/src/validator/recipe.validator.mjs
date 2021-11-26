import {IngredientValidator} from "./ingredient.validator.mjs";

export class RecipeValidator{
    constructor() {
        this.ingredientValidator = new IngredientValidator();
    }

    validate(recipe){
        let error = ''
        if( !recipe.name ){
            error += 'Recipe name must be included!'
        } else if (recipe.name.length === 0){
            error += 'Recipe name cannot be empty!'
        }
        if( !recipe.description ){
            error += 'Recipe description must be included!'
        } else if ( recipe.description.length === 0 ){
            error += 'Recipe description cannot be empty!'
        }
        if ( !recipe.imagePath ){
            error += 'Image path must be included!'
        } else if( recipe.imagePath.length === 0) {
            error += 'Image path cannot be empty!'
        }
        if ( !recipe.ingredients ){
            error += 'Ingredients must be included!'
        } else {
            let ingredientError = this.ingredientValidator.validateIngredients(recipe.ingredients)
            if (ingredientError.length !== 0){
                error += ingredientError;
            }
        }
        console.log(error);
        return error;
    }
}
