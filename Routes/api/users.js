const express = require('express');
const Router = express.Router();
const {body, validationResult} = require('express-validator');
const User = require('../../Models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
//@router GET/api/users 
//@descr register user
//@access public
Router.post('/',[
body('name', 'Name is required').not().isEmpty(),
body('email', 'Must be an email with min of 6 characters').isEmail(),
body('password', 'Password is required').not().isEmpty()
],async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }
    const {name, email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            return res.send(400).json({errors:[{msg:"User already exits"}]})
        }
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        
        userData = new User({
            name,
            email,
            password,
            avatar
        });
    
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(password, salt);
        await userData.save();
        console.log(userData);
        res.send("User created successfully");


    } catch (error) {
        console.log(error.message)
    }
});
module.exports = Router;