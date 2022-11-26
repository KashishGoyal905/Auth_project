const express = require('express');
const port = 8000;
const app = express();


const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded());

// to permamnently store the session
const MongoStore = require('connect-mongo');
app.use(session({
    name: 'auth',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/Auth',
            dbName: 'db'
        },
        function (err) {
            console.log(err || 'connect-mongo done');
        }
    )
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log("error in running server");
        return;
    }
    console.log("server listening on port: " + port);
});