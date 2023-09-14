const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require('mongoose')

router.get('/cadastro', (req, res) => {
    res.render('commom-area/register')
})

router.get('/login', (req, res) => {
    res.render('commom-area/login')
})

module.exports = router