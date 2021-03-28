const express = require('express');
const Router = express.Router();
//@router GET/api/auth 
//@descr test Api
//@access public
Router.get('/', (req, res)=>{
    res.send('Auth Routes')
});
module.exports = Router;