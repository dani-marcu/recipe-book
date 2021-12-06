import mongoose from 'mongoose';
import validator from 'validator';
import mongoose_fuzzy_searching from 'mongoose-fuzzy-searching';

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    imagePath: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('Image path is invalid')
            }
        }
    },
    ingredients: [
        {
            name: {
                type: String,
                required: true,
                trim: true
            },
            amount: {
                type: Number,
                required: true,
                validate(value) {
                    if (value <= 0) {
                        throw new Error('Ingredient amount must be a positive number')
                    }
                }
            }
        }
    ]
});

RecipeSchema.plugin(mongoose_fuzzy_searching,{fields: ['name']});
const Recipe = mongoose.model('Recipe',RecipeSchema);
export {Recipe as default}
