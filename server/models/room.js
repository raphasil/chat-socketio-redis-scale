'use strict';

const commons = require('./commons');
const mongo = require('mongoose');

const messages = new mongo.Schema({
    from: { type: mongo.Schema.Types.ObjectId, required: [true, 'from is required'] },
    message: { type: String, trim: true, required: [true, 'message is required'] },
}, commons.options);

const schema = new mongo.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'name is required'],
    },
    users: {
        type: [mongo.Schema.Types.ObjectId],
        ref: 'User',
        required: [true, 'list of users is required'],
    },
    creator: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'creator is required'],
    },
    messages: { type: [messages], default: [] },
}, commons.options);

module.exports = mongo.model('Room', schema);
