import {setupDatabase, userOne} from "./fixtures/db.mjs";
import { initApp } from "../src/app.mjs";
import { request} from "./test-helper";
import Recipe from "../src/models/recipe.mjs";

const app = initApp();

beforeEach(setupDatabase);

test('Should create recipe for user', async () => {
    const response = await request(app)
        .post('/api/recipes')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name : "test recipe",
            imagePath : "a.com",
            description : "test description",
            ingredients : []
        })
        .expect(201)
    const recipe = await Recipe.findById(response.body._id)
    expect(recipe).not.toBeNull()
})

test('Should fetch user recipes', async () => {
    const response = await request(app)
        .get('/api/recipes')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(1)
})
