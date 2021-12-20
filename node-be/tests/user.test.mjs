import {setupDatabase, userOne, userOneId} from "./fixtures/db.mjs";
import { initApp } from "../src/app.mjs";
import { request} from "./test-helper";
import User from "../src/models/user.mjs";

const app = initApp();

beforeEach(setupDatabase);

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/users/register")
    .send({
      email: "email@example.com",
      password: "parola!",
    })
    .expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      email: "email@example.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("parola!");
});

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'wrongpassword'
    }).expect(400)
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            hairColor: 'brown'
        })
        .expect(400)
})
