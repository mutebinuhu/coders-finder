const express = require('express');
const Router = express.Router();
const authMiddleWare  = require('./middleware/auth');
const User = require('../../Models/User')
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
//@router GET/api/auth 
//@descr test Api
//@access public
Router.get('/', authMiddleWare, async (req, res)=>{
    try {
       const userData = await User.findById(req.user.id).select('-password');
       res.status(200).json({
           data:userData
       })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
    res.send('Auth Routes')
});
//@router POST/api/auth 
//@descr register user
//@access public
Router.post('/',[

    body('email', 'Email is required ').not().isEmpty(),
    body('password', 'Password is required').not().isEmpty()
    ],async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errors: errors.array()})
        }
        const {email,password} = req.body;
        try {
            let user = await User.findOne({email});
            if(!user){
               return  res.status(400).json({errors:[{msg:"Invalid Credentials"}]})
            }
            
            //
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                res.status(400).json({errors:[{msg:"Invalid Credentials"}]})
            }
        
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