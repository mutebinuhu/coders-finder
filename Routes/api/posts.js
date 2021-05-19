const express = require('express');
const Router = express.Router();
const auth = require('./middleware/auth');
const {body, validationResult} = require('express-validator')
const User = require('../../Models/User');
const Post = require('../../Models/Post');

//@router GET/api/post 
//@descr test Api
//@access public
Router.post('/',[auth, 
    body('text', 'Text is required').not().isEmpty(),
],async (req, res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(500).json({errors: errors.array()})
        }
        const user = await User.findById(req.user.id).select('-password');
        const post = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar
        });
        await post.save();
        res.json(post)
    } catch (err) {
      console.error(err.message)  
    }
});
module.exports = Router;