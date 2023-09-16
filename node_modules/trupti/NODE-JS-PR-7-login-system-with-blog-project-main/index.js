const express = require('express');
const path = require('path');

const passport = require('passport');
const session = require('express-session');

const port = 6400;

const app = express();

app.set("view engine", "ejs")
app.use(express.urlencoded())
const passportlocal = require('./config/passportlocal');

app.use(session({
    name: 'name',
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))


app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.use(passport.session());
app.use(passport.initialize());  

app.use('/public', express.static(path.join(__dirname, 'public')))

const formtbl = require('./config/table')

const db = require('./model/mongoose')

app.use(passport.setauthentication);
app.use('/', require('./routs/indexrouts'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("server is start on port : " + port);
})