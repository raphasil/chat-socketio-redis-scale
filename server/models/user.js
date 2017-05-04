'use strict';

const commons = require('./commons');
const mongo = require('mongoose');

const schema = new mongo.Schema({
    username: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'username is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        bcrypt: true,
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'name is required'],
    },
}, commons.options);

schema.plugin(require('mongoose-bcrypt'));

module.exports = mongo.model('User', schema);
