const mogoose = require('mongoose');

const adminschema = mogoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const admin = mogoose.model('table', adminschema);

module.exports = admin;