import {IngredientValidator} from "./ingredient.validator.mjs";

export class RecipeValidator{
    constructor() {
        this.ingredientValidator = new IngredientValidator();
    }

    validate(recipe){
        let error = ''
        if( !recipe.name ){
            error += 'Recipe name must be included!'
        }
        if( !recipe.description ){
            error += 'Recipe description must be included!'
        }
        if ( !recipe.recipe ){
            error += 'Image must be included!'
        }
        if ( !recipe.ingredients ){
            error += 'Ingredients must be included!'
        } else {
            let ingredientError = this.ingredientValidator.validateIngredients(recipe.ingredients)
            if (ingredientError.length !== 0){
                error += ingredientError;
            }
        }
        if(error){
            throw(error);
        }
    }
}
