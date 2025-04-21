const express = require('express');
const User = require('../models/UserModel');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');

//Register Route
userRouter.post('/register', async (req, res) => {
   
    try {
        const { username, email, password } = req.body;
        const userExists = await User.findOne({ email});
        if(userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({
            username,
            email,
            password,
        });
        if(user) {
            return res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
            });
        } else {
            return res.status(400).json({ message: 'error.message' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});

//Login Route
userRouter.post('/login',async (req,res)=>{
   
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user && (await user.matchPassword(password))){
            return res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin:user.isAdmin,
                token: generateToken(user._id),
            })

        }
        else{
            return res.status(401).json({message: 'Invalid email or password'});
        }
    }catch(error) {
        return res.status(400).json({ message: 'error.message' });
    }
});

//Generate JWT Token
const generateToken =(id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

module.exports = userRouter;