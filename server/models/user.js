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

schema.post('save', commons.handdleError.bind('error saver user'));
schema.post('update', commons.handdleError.bind('error update user'));
schema.post('findOneAndUpdate', commons.handdleError.bind('error findOneAndUpdate user'));
schema.post('findOne', commons.handdleError.bind('error findOne user'));

module.exports = mongo.model('User', schema);
