const express = require('express');
const Router = express.Router();
const auth = require('./middleware/auth');
const {body, validationResult} = require('express-validator')
const User = require('../../Models/User');
const Post = require('../../Models/Post');

//@router POST/api/post
//@descr create apost
//@access private
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
            avatar: user.avatar,
            user: req.user.id
        });
        await post.save();
        res.json(post)
    } catch (err) {
      console.error(err.message)  
    }
});
//@router GET/api/posts
//@descr get all posts
//@access private
Router.get('/', auth, async (req, res)=>{
    try {
        const getPosts = await Post.find().sort({date: -1});
        res.status(200).json(getPosts)
    } catch (error) {
        
    }
});
//@router GET/api/post/:id
//@descr get a single post
//@access private
Router.get('/:id', async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            res.status(404).json({msg: "post not found"});

        }
        res.status(200).json(post)
    } catch (err) {
        console.log(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Post  Not Found'})
        }
        res.status(500).send("server error");
    }
});
//@router DELETE/api/post/:id
//@descr delete a single post
//@access private
Router.delete('/:id', auth,  async (req, res)=>{
    
   try {
    const post = await Post.findById(req.params.id);
    if(!post){
        res.status(400).json({msg: 'post not found'});
    }
    if(post.user.toString() !== req.user.id){
        res.status(401).json({msg: 'An Authorised'})
    }
    await post.remove();
    res.json({msg: 'Post Deleted'})
   } catch (err) {
       console.log(err.message)
       if(err.kind === 'ObjectId'){
        res.status(400).json({msg: 'post not found'});
       }
       res.status(500).send('Server error')
   }
});

module.exports = Router;