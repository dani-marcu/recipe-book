import express from "express";
import User from "../models/user.mjs";
import {auth} from "../middleware/auth.mjs";
import {decode} from "jsonwebtoken";
import {UsersService} from "../service/users.service.mjs";

const usersService = new UsersService();

const usersRouter = new express.Router()

usersRouter.post('/users', async (req, res) => {
    try {
        const addedUser = await usersService.saveUser(req.body);
        res.status(201).send(addedUser);
    } catch (error) {
        res.status(400).send(error);
    }
})

usersRouter.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
})

usersRouter.post('/users/logout', auth, async (req, res) => {
    try {
        await usersService.logOut(req.user, req.token)
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

usersRouter.post('/users/logoutAll', auth, async (req, res) => {
    try {
        await usersService.logOutAll(req.user);
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

usersRouter.patch('/users/me', auth, async (req, res) => {

    try {
        const updatedUser = await usersService.updateUser(req.body, req.user)
        res.send(updatedUser)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

usersRouter.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

usersRouter.post('/users/login', async (req, res) => {
    try {
        const loggedInUser = await usersService.logIn(req.body);
        res.send(loggedInUser)
    } catch (e) {
        res.status(400).send();
    }
})

export {usersRouter as default}
