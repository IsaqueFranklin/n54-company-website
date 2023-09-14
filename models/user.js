const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    nome: {
        type: String,
        required: true
    },

    email: {
        type: String,
        requried: true
    },

    senha: {
        type: String,
        required: true
    },

    instagram: {
        type: String,
        requried: true
    },

    eAdmin: {
        type: Number,
        default: 1
    }
})

mongoose.model('users', User)