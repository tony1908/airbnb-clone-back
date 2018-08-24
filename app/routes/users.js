const express = require('express');
const params = require('strong-params');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../db/models/users');
const SALT = parseInt(process.env.SALT);
const router = express.Router();

router.use(params.expressMiddleware());

router.post('/signup', (req, res) => {
    const params = req.parameters;
    let userParams = params.require('user').permit('email', 'password').value();
    bcrypt.hash(userParams.password, SALT, (err, hash) => {
        userParams.password = hash;
        const user = new Users(userParams)
        user.save().then((createdUser) => {
            const token = jwt.sign(createdUser.toJSON(), 'devfrules')
            res.send({token:token});
        })
    })
})

router.post('/login', (req, res) => {
    const params = req.parameters;
    let userParams = params.require('user').permit('email', 'password').value();
    Users.findOne({
        email: userParams.email
    }, (error, user) => {
        if (error) return res.send(error);
        bcrypt.compare(userParams.password, user.password, (err, reponse) => {
            if (reponse) {  
                const token = jwt.sign(user.toJSON(), 'devfrules')
                res.send({token:token});
            } else {
                res.send("lo siento no entraste");
            }
        })
    } )
})


module.exports = router;