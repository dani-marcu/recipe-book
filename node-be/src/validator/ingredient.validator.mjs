export class IngredientValidator {
    constructor() {
    }

    validateIngredients(ingredients){
        let error = '';
        for(const key in ingredients) {
            error = this.validate(ingredients[key]);
            if(error.length !== 0){
                return error;
            }
        }
        return error;
    }

    validate(ingredient){
        let error = ''
        if( !ingredient.name ){
            error += 'Recipe name must be included!'
        } else if (ingredient.name.length === 0){
            error += 'Recipe name cannot be empty!'
        }
        if( !ingredient.amount ){
            error += 'Recipe amount must be included!'
        } else if (ingredient.amount<=0){
            error += 'Recipe amount must be a positive number!'
        }
        return error;
    }
}
