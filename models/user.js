const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    nome: {
        type: String,
        required: false
    },

    email: {
        type: String,
        required: true
    },

    senha: {
        type: String,
        required: true
    },

    instagram: {
        type: String,
        required: false
    },

    eAdmin: {
        type: Number,
        default: 1
    }
})

mongoose.model('users', User)