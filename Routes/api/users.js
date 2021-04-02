const express = require('express');
const Router = express.Router();
const {body, validationResult} = require('express-validator');
const User = require('../../Models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');


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
    const {email, name, password} = req.body;
    try {
        let user = await User.findOne({email})
        if(user){
           return  res.status(400).json({errors:[{msg:"user exists"}]})
        }
        let avatar = gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        } );
        user = new User({
            name,
            email,
            password,
            avatar
        })
        //bcrypt
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        //webtoken
        let payload = {
            user: {
                id:user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000},(err, token)=>{
            if(err) throw err;
        const {name, description} = req.body
            res.send({token:token, data: user})
        })
    
    } catch (error) {
       console.log(error.message);
       res.send("server error");
    }
    
});
module.exports = Router;