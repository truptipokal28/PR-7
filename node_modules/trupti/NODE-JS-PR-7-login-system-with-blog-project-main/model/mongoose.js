const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/project7');

const db = mongoose.connection;

db.on('connected', (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("server is start on db");
})

module.exports = db;