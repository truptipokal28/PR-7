const express = require('express')
const multer = require('multer')
const fs = require('fs');

const image = require('../config/table')

const file = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const routes = express.Router();
const imagedata = multer({ storage: file }).single('image');
const controller = require('../controller/indexcontroller');
const passport = require('passport');

routes.get('/', controller.login)
routes.get('/register', controller.register)
routes.post('/logindata', passport.authenticate('local', { failureRedirect: '/' }), controller.logindata)
routes.post('/registerdata', controller.registerdata)
routes.get('/index', passport.checkauthentication, controller.index)
routes.get('/table', passport.checkauthentication, controller.table)
routes.get('/form', passport.checkauthentication, controller.form)
routes.post('/formdata', imagedata, controller.formdata)
routes.get('/deletedata', controller.deletedata)
routes.get('/editdata', controller.editdata) 
routes.post('/updatedata',imagedata, controller.updatedata)
routes.get('/signout', controller.signout)

module.exports = routes;