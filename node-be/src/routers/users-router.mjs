import express from "express";
import User from "../models/user.mjs";
import {auth} from "../middleware/auth.mjs";

const usersRouter = new express.Router()

usersRouter.post('/users',async(req,res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken();
        res.status(201).send({user,token});
    } catch (error) {
        res.status(400).send(error);
    }
})

usersRouter.get('/users/me',auth,async(req,res)=>{
    res.send(req.user);
})

usersRouter.post('/users/logout',auth,async(req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

usersRouter.post('/users/logoutAll',auth,async(req,res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

usersRouter.patch('/users/me',auth,async(req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try{
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user)
    }catch(error){
        console.log(error)
        res.status(400).send(error)
    }
})

usersRouter.delete('/users/me',auth,async (req,res) => {
    try{
        await req.user.remove();
        res.send(req.user)
    }catch(error){
        res.status(500).send()
    }
})

usersRouter.post('/users/login',async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.send({user,token})
    } catch(e){
        res.status(400).send();
    }
})

export {usersRouter as default}
