const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user_schema');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
        if (err) {
            console.log("error in authenticating user");
            return done(err);
        }
        if (!user || user.password != password) {
            console.log("false password/email", err);
            return done(null, false);
        }
        return done(null, user);
    })
}));

passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("error in deserializing user");
            return done(err);
        }
        return done(null, user);
    })
});


passport.checkauthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;