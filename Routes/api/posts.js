const express = require('express');
const Router = express.Router();
//@router GET/api/posts 
//@descr test Api
//@access public
Router.get('/', (req, res)=>{
    res.send('Posts Routes')
});
module.exports = Router;