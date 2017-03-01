const express = require('express');
const router= express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dbConfig = require ('../config/db');
const User= require('../models/user');

router.post('/register',(req,res,next) => {
    let newUser= new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser,(error,result) => {
        if (error){            
            return res.status(500).json({
                title: 'An error occured',
                error:error
            });
        }
        return res.status(201).json({
            title:'User create successfully',
            obj : result
        });
    });
    
});

router.post('/authenticate',(req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username,(error,user) => {
        if (error){
            return res.status(500).json({
                title: 'An error occured',
                error:error
            });
        }
        if(!user){
            return res.status(401).json({
                title: 'Login Failed',
                error:{message:'Invalid login credentials.'}
            });
        }
       
        User.comparePassword(password,user.password,(error,isMatch) => {
            if (error){
                return res.status(500).json({
                title: 'An error occured',
                error:error
            });
        }
        if (!isMatch){
            return res.status(401).json({
                title: 'Login Failed',
                error:{message:'Invalid login credentials.'}
            });
        }
        const token=jwt.sign(user,dbConfig.secret,{
            expiresIn : 7200 // 2minutes
        });
        res.status(200).json({
            message:'Successfully logged in',
            token:'JWT '+token,
            user:{
                id:user._id,
                username:user.username,
                email: user.email,
                name:user.name
            }
        });
        });
    });
});

router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next) => {
    res.json({user: req.user});
});
module.exports=router;