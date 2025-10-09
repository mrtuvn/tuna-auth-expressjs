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
    position: {
        type: String,
        require: true
    },
    dateJoin: {
        type: String,
        require: true
    },
    location: [
        {
            address: {
                type: String,
                require: true
            },
            district: {
                type: String,
                require: true
            },
            city: {
                type: String,
                require: true
            },
        }
    ],
    dob: {
        type: Date,
        require: false,
        default: Date.now
    },
})

module.exports = mongoose.model('member', memberSchema)