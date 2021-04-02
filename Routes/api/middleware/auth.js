const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config')

    module.exports = function(req, res, next){
        const token = req.header('x-auth-token');
        if(!token){
            res.status(401).json({msg:"No Token given"})
        }
        try {
            const decoded = jwt.verify(token,config.get('jwtSecret'))

            req.user = decoded.user;
        next();

        } catch (error) {
            console.log(error.message)
            res.status(500).json({msg: "invalid token provided"})
        }
    }
