const express = require('express');
const Router = express.Router();
//@router GET/api/users 
//@descr test Api
//@access public
Router.get('/', (req, res)=>{
    res.send('User Routes')
});
module.exports = Router;