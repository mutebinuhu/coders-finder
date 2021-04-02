const express = require('express');
const Router = express.Router();
const authMiddleWare  = require('./middleware/auth');
//@router GET/api/auth 
//@descr test Api
//@access public
Router.get('/', authMiddleWare, (req, res)=>{
    res.send('Auth Routes')
});
module.exports = Router;