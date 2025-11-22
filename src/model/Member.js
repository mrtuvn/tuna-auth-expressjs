const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    avatar: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
    },
    dob: {
        type: String,
    },
    dateJoin: {
        type: String
    },
    address: {
        type: String,
    },
    district: {
        type: String,
    },
    city: {
        type: String,
    },
    nationality: {
        type: String,
    },
    gender: {
        type: String,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    bio: {
        type: String,
    },
    role: {
        type: String,
    },
    team: {
        type: String,
    },
    position: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('member', memberSchema)