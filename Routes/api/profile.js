const express = require('express');
const Router = express.Router();
//@router GET/api/profile 
//@descr test Api
//@access public
Router.get('/', (req, res)=>{
    res.send('Profile Routes')
});
module.exports = Router;