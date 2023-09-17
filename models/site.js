const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Site = new Schema({
    nome: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: false
    },

    hero: {
        type: Array,
        required: false,
        default: 0
    },

    eAdmin: {
        type: Number,
        default: 1
    }
})

mongoose.model('sites', Site)