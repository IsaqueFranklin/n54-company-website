const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')
const passport = require('passport')

const moment = require('moment')

require('../models/user')
const User = mongoose.model('users')


router.post('/cadastro', async(req, res) => {
    try{
        const {email, password} = req.body;
        firebase.auth().createUserEmailAndPassword(email, password).then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user);
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error);
        });
        res.redirect('/criarwebsite');
    } catch(e) {
        res.redirect('cadastro');
    }
})


router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
        var user = userCredential.user;
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
    res.redirect('/painel')
})


router.get('/criarwebsite', (req, res) => {
    res.render('./views/admin-area/criarwebsite')
})

router.get('/painel', (req, res) => {
    res.render('./views/admin-area/painel')
})
