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
]], (req, res)=>{
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
    const profileFields = {}
    profileFields.user = req.user.id
    if(status) profileFields.status = status
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(skills){
        profileFields.skills = skills.split(",").map(skills=>skills)
    }
    res.json({
        data:profileFields
    })

   

});

module.exports = Router;