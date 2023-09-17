const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    nome: {
        type: String,
        required: true
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

    sites: {
        type: Array,
        required: false,
        default: 0
    },

    eAdmin: {
        type: Number,
        default: 1
    }
})

mongoose.model('users', User)