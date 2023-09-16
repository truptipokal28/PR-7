const { name, renderFile } = require('ejs');
const path = require('path');
const fs = require('fs');
const registertbl = require('../config/form')
const formtbl = require('../config/table')

const login = (req, res) => {
    return res.render('login');
}

const logindata = (req, res) => {
    return res.redirect('/index');
}

const register = async (req, res) => {
    return res.render('register')
}

const table = async (req, res) => {
    try {
        let record = await formtbl.find({});  
        if (record) {
            return res.render('table', {
                record
            })
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const form = async (req, res) => {
    return res.render('form')
}

const registerdata = async (req, res) => {
    try {
        const { name, email, password, cpassword } = req.body;
        if (password == cpassword) {
            const data = await registertbl.create({
                name: name,
                email: email,
                password: password
            })
            if (data) {
                console.log("record is added");
                return res.redirect('/')
            }
            else {
                console.log("record not added");
                return res.redirect('back')
            }
        }
        else {
            console.log("password and confirm password is not same");
            return res.redirect('back');
        }

    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const index = (req, res) => {
    return res.render('index')
}

const formdata = async (req, res) => {
    let image = "";
    if (req.file) {
        image = req.file.path;
    }
    const { name, description } = req.body;
    try {
        let data = await formtbl.create({
            name: name,
            description: description,
            image: image
        })
        if (data) {
            console.log("data is added");
            return res.redirect('back');
        }
        else {
            console.log("data is not added");
            return false;
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const deletedata = async (req, res) => {
    try {
        id = req.query.id;
        let record = await formtbl.findByIdAndDelete(id);
        if (record) {
            console.log("Record successfully deleted");
            fs.unlinkSync(record.image);
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
    }
}

const editdata = async (req, res) => {
    try {
        id = req.query.id;
        let record = await formtbl.findById(id)
        if (record) {
            return res.render('edit', {
                record
            });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const updatedata = (req, res) => {
    let id = req.body.id;
    const { name, description } = req.body;
    if (req.file) {
        formtbl.findById(id).then((oldimage) => {
            fs.unlinkSync(oldimage.image);
            let image = req.file.path;
            formtbl.findByIdAndUpdate(id, {
                name: name,
                description: description,
                image: image,
            }).then((success) => {
                console.log("Record successfully deleted");
                return res.redirect('/table');
            }).catch((err) => {
                console.log(err);
                return false;
            })
        }).catch((err) => {
            console.log(err);
            return false;
        })
    }
    else{
        formtbl.findById(id).then((oldimage) => {
            let image = oldimage.path;
            formtbl.findByIdAndUpdate(id, {
                name: name,
                description: description,
                image: image
            }).then((success) => {
                console.log("Record successfully deleted");
                return res.redirect('/table');
            }).catch((err) => {
                console.log(err);
                return false;
            })
        }).catch((err) => {
            console.log(err);
            return false;
        })
    }
}

const signout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return false;
        }
        return res.redirect('/');
    })
}

module.exports = {
    login,
    logindata,
    register,
    registerdata,
    index,
    table,
    form,
    formdata,
    deletedata,
    editdata,
    updatedata,
    signout,

}