const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
    created_by: {
        type: Date,
        default: Date.now
    },
    updated_by: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('todo', todoSchema)