const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
// mongoose.Promise = require('bluebird');
//User schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

mongoose.Promise = global.Promise;
//to give mongoose access to user
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = { username: username };
    User.findOne(query, callback);
}

//
module.exports.addUser = function(newUser, callback) {
    // console.log('Inside Add user');
    // console.log(newUser);
    //genSalt will be used to encrypt the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            // console.log('hash' + hash);
            if (err) console.log(err);
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}