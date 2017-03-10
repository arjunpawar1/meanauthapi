const express = require('express');
const router = express.Router();
const User = require('../models/user')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
//Register
router.post('/register', (req, res, next) => {

    // console.log(req.body);
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    // console.log('newUser');
    // console.log(newUser);
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to Register User' });
        } else {
            res.json({ success: true, msg: 'User Registered' });
        }
    });
});

//Authenticate
router.post('/authenticate', (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;

        if (!user) {
            return res.json({ success: false, msg: "User Not Found" });

        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 //login access for a week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({ success: false, msg: "Wrong password" });
            }

        });
    });

});

//Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({
        user: req.user
    });
});

//Validate
router.get('/validate', (req, res, next) => {
    res.send('Validate');
});

module.exports = router;