const passport = require('passport');

const passportlocal = require('passport-local').Strategy;

const registertbl = require('../config/form');

passport.use(new passportlocal({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await registertbl.findOne({ email: email });
        if (!user || user.password != password) {
            return done(null, false)
        }
        else {
            return done(null, user)
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
));

passport.serializeUser((user, done) => {
    return done(null, user.id)
})

passport.deserializeUser((id, done) => {
    registertbl.findById(id).then((user) => {
        return done(null, user)
    }).catch((err) => {
        return done(null, false)
    })
})

passport.checkauthentication = (req, res, next) => {
    if (req.isAuthenticated()) {   
        return next();
    } else {
        res.redirect("/");
    }
}

passport.setauthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.users = req.user;
    }
    return next();
}

module.exports = passport; 
