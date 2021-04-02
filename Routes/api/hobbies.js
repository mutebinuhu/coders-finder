const express = require('express');
const Hobbie = require('../../Models/Hobbies')
const {body, validationResults, validationResult} = require('express-validator')
const Router = express.Router();
Router.post('/', [
body('name', 'Hobby name is required').not().isEmpty()
], async (req, res)=>{
    const errors = validationResult(req);
    const {name, description} = req.body

    if(!errors.isEmpty()){
       return res.status(400).send({msg: errors.array()}); 
    }
    try {
        let hobby = new Hobbie({
            name,
            description
        })
        await hobby.save();
    } catch (error) {
        console.log(error.message)
    }

});
module.exports = Router;