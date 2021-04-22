const express = require('express');
const Router = express.Router();
const auth = require('./middleware/auth');

const Profile = require('../../Models/Profile');
const User = require('../../Models/User');
const { response, json } = require('express');
const {body, validationResult} = require('express-validator')

//@router GET/api/profile/me
//@descr get the user api
//@access private

Router.get('/me', auth, async(req, res)=>{

    try {
        const profileData = await Profile.findOne({user:req.user.id}).populate('user', ['name', 'avatar']);
        if (!profileData) {
            res.status(400).json({msg:"Profile not found"})
        }
        res.json(profileData)
    } catch (error) {
        return next(error)
        console.log("errors---", error.message)
        res.status(500).send("server error")
    }
    
});
//@router POST/api/profile 
//@descr add user profile
//@access private
Router.post('/',[auth, [
    body('status', 'Status is required').not().isEmpty(),
    body('skills', "Skills are required").not().isEmpty()
]],async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedIn
    } = req.body;
    //build the profile object
    const profileFields = {}
    profileFields.user = req.user.id
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(skills){
        profileFields.skills = skills.split(",").map(skills=>skills)
    }
    //build social object
    profileFields.social = {};
    if(githubusername) profileFields.social.githubusername = githubusername
    if(youtube) profileFields.social.youtube = youtube
    if(twitter) profileFields.social.twitter = twitter
    if(instagram) profileFields.social.instagram = instagram
    if(facebook) profileFields.social.facebook = facebook
    if(linkedIn) profileFields.social.linkedIn = linkedIn

    //find profile
    try{
        let profile = await Profile.findOne({user: req.user.id});
        if(profile){
            profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
            return res.json(profile)
        }
        //save if profile not found
        profile = new Profile(profileFields);
        await profile.save()
        res.json(profile)
    }catch(err){
        console.log(err.message)
        res.status(500).send("server error");
    }
});
    //@router POST/api/profile 
    //@descr get all profiles
    //@access public

Router.get('/', async (req,res)=>{
    try {
        let profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles) 
    } catch (err) {
        console.log(err.message)
        res.status(500).send("server error")
    }
})
    //@router POST/api/profile/user/user_id
    //@descr get all profiles
    //@access public
Router.get('/user/:user_id', async (req,res)=>{
    try {
        let profile = await Profile.findOne({user:req.params.user_id}).populate('user', ['name', 'avatar']);
        if(!profile){
            return res.status(400).json({msg: 'Profile not found'})
        }
        res.status(200).json(profile)
    } catch (err) {
        console.log(err.message)
        if (err.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Profile not found'})
        }
        res.status(500).send("server error")
    }
})
    //@router DELETE/api/profile/
    //@descr delete Profile and user
    //@access private
Router.delete('/', auth, async (req,res)=>{
    try {
        await Profile.findOneAndRemove({user: req.user.id})
        await User.findOneAndRemove({_id: req.user.id})
        res.status(200).json({msg:"User Deleted"})
    } catch (err) {
        console.log(err.message)
        res.status(500).send("server error")
    }
})
//@router PUT/api/profile/
    //@descr update Profile
    //@access private
Router.put('/', async (req, res)=>{
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;
            
        const newExp={
        title,
        company,
        location,
        from,
        to,
        current,
        description
        }
            try {
                const profile = await Profile.findOne({user: '60813889e2ebeb22389630d5'});
                profile.experience.unshift(newExp)
                await profile.save()
                res.json(profile);
            } catch (error) {
                console.log(error.message);
                res.send("server error")
            }

         
})


module.exports = Router;