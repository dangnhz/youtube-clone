const jwt = require('jsonwebtoken')
const User = require('../models/User')
const accessToken = require("../config/accessToken");

function auth (req, res, next) {
    let token = req.header('x-auth-token')
    console.log(token)
    if (!token) 
        return res.status(401).json({msg: 'No token, authorizaton denied'})
    try {
        const decoded = jwt.verify(token, accessToken.secretKey)
        console.log(decoded)
        req.user = decoded
        next();
    } catch (e) {
        res.status(400).json({msg: 'Token is not valid'})
    }
}

module.exports = auth