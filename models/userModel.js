const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utilities/userRoles');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'must be a valid Email address']
    },
    password:{
        type: String,
        required: true
    },
    token:{
        type: String
    },
    role: {
        type: String,
        enum: [userRoles.ADMIN, userRoles.USER, userRoles.MANAGER],
        dafault : userRoles.USER
    },
    avatar: {
        type: String,
        default: '/uploads/profile.jpg' // saved the name of pic not the pic itself
    }

});

module.exports = mongoose.model('User', userSchema); 