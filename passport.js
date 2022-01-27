const express = require('express');
const jwt = require('jsonwebtoken');

// configure express
const passport = express.Router();

// configure jwt
const secret = require('./config/jwt');

// configure middleware
passport.use((req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.json({
            error: 'The token is required'
        });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, secret.key, (e, decoded) => {
            if (e) {
                return res.json({
                    error: 'The token is invalid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }

});

module.exports = passport;
