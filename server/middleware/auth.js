const jwt = require('jsonwebtoken')
const User = require('../models/User')
const accessToken = require("../config/accessToken");

function auth (req, res, next) {
    let token = req.header('x-auth-token')
    console.log(token)
    if (!token) 
        return res.status(401).send({msg: 'No token, authorizaton denied'})
    try {
        const decoded = jwt.verify(token, accessToken.secretKey)
        req.user = decoded
        next();
    } catch (e) {
        res.status(400).send({msg: 'Token is not valid'})
    }
}

module.exports = auth