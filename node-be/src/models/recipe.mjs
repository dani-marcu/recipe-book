import mongoose from 'mongoose';
import validator from 'validator';

const Recipe = mongoose.model('Recipe', {
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
})

export {Recipe as default}
