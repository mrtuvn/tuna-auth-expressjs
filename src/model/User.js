const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    role: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    created_by: {
        type: Date,
        default: Date.now
    },
    upadted_by: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', userSchema)