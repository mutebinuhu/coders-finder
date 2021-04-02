const express = require('express');
const Router = express.Router();
Router.get('/', (req, res)=>{
    res.send("New Page Comming soon")
});
module.exports = Router;