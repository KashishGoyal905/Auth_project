const express = require('express');
const router = express.Router();

const User = require('../models/user_schema');
const passport = require('passport');

router.get('/', passport.checkauthentication, function (req, res) {
    User.find({}, function (err, user) {
        if (err) {
            console.log("error in finding the users", err);
            return;
        }
        return res.render('home', {
            users: user,
        });
    })
});

router.get('/profile', function (req, res) {
    res.render('profile')
})

router.get('/sign-in', function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('sign-in');
});

router.get('/sign-up', function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('sign-up');
});

router.post('/create-user', function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log("error in finding the user", err);
            return;
        }
        if (user || req.body.password != req.body.cnfpass) {
            console.log("password mismatch");
            return res.redirect("/sign-up");
        }
        User.create(req.body, function (err, user) {
            if (err) {
                console.log("error in creating the user", err);
                return;
            }
            return res.redirect('/');
        })
    })
});

router.post('/create-session', passport.authenticate(
    'local',
    {
        failureRedirect: '/sign-in',
    }
), function (req, res) {
    return res.redirect('/');
})

module.exports = router;