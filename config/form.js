const mogoose = require('mongoose');

const adminschema = mogoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const admin = mogoose.model('admin', adminschema);

module.exports = admin;