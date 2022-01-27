const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// configure express
const route = express.Router();

// configure jwt
const secret = require('./config/jwt');

// import passport
const passport = require('./passport');

// inport rd
const rd = require('./rd');

// configure routes
route.post('/login', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    
    try {
        let user = await rd.find(email);

        if (await bcryptjs.compare(password, user.password)) {
            let payload = {
                check: true
            }
            
            let token = jwt.sign(payload, secret.key, {
                expiresIn: '2h'
            });

            res.json({
                token: token,
                id: user.id,
                name: user.name,
                email: user.email
            });
        } else {
            res.json({
                error: 'The password is incorrect'
            });
        }
    } catch (e) {
        res.json({
            error: 'This email does not exist'
        });
    }
});

// validate the token
route.get('/passport', passport, (req, res) => {
    res.json({
        token: 'The token is valid'
    });
});

// routes protected by the middleware
route.get('/me/:email', passport, async (req, res) => {
    let email = req.params.email;

    try {
        let user = await rd.find(email);

        res.json({
            id: user.id,
            name: user.name,
            email: user.email
        });
    } catch (e) {
        res.json({
            error: 'This email does not exist'
        });
    }
});

module.exports = route;
