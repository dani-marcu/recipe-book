export class IngredientValidator {
    constructor() {
    }

    validateIngredients(ingredients){
        for(const key in ingredients) {
            let error = this.validate(ingredients[key]);
            if(error){
                return error;
            }
        }
        return '';
    }

    validate(ingredient){
        let error = ''
        if( !ingredient.name ){
            error += 'Recipe name must be included!'
        }
        if( !ingredient.amount){
            error += 'Recipe amount must be included!'
        } else if (isNaN(ingredient.amount) || ingredient.amount<=1){
            error += 'Recipe amount must be a positive number!'
        }
        return error;
    }
}
