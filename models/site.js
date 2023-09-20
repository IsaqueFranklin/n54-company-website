const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Site = new Schema({
    titleHero: {
        type: String,
        required: true
    },

    sloganHero: {
        type: String,
        required: true
    },

    titleAbout: {
        type: String,
        required: true
    },

    textAbout: {
        type: String,
        required: true
    },

    ctaAbout: {
        type: String,
        required: true
    },

    titleServices: {
        type: String,
        required: true
    },

    textServices: {
        type: String,
        required: true
    },

    ctaServices: {
        type: String,
        required: true
    },

    titleWhyUs: {
        type: String,
        required: true
    },

    textWhyUs: {
        type: String,
        required: true
    },

    titleDiferentials: {
        type: String,
        required: true
    },

    textDiferentials: {
        type: String,
        required: true
    },

    titleGalery: {
        type: String,
        required: true
    },

    titleContact: {
        type: String,
        required: true
    },

    textContact: {
        type: String,
        required: true
    }
})

mongoose.model('sites', Site)