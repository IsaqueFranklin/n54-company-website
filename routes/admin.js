const express = require('express')
const router = express.Router()
const path = require('path')
const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')
const passport = require('passport')
const { eUser } = require('../helpers/eUser')

const moment = require('moment')

require('../models/user')
const User = mongoose.model('users')


router.post('/cadastro', (req, res, next) => {
    var erros = []

    /*if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido."})
    }*/

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email inválido."})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha inválida."})
    }

    if(req.body.senha.lenght < 8){
        erros.push({texto: "Senha muito curta, mínimo de 8 caracteres."})
    }

    if(req.body.senha != req.body.senha2){
        erros.push({texto: "Senhas não batem."})
    }

    if(erros.length > 0){
        res.render('commom-area/register', {erros: erros})

    }else{
        User.findOne({email: req.body.email}).then(function(admin){
            if(admin){
                req.flash("error_msg", "Já existe uma conta com esse email")
                res.redirect('/website/registro')
            }else{
                const newUser = new User({
                    nome: req.body.nome,
                    email: req.body.email,
                    instagram: req.body.instagram,
                    senha: req.body.senha
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(newUser.senha, salt, (erro, hash) => {
                        if(erro){
                            req.flash('error_msg', 'Houve um erro durante o salvamento.')
                            res.redirect('/website/registro')
                        }

                        newUser.senha = hash

                        newUser.save().then(function(){
                            req.flash('success_msg', 'Usuário criado com sucesso!')
                            passport.authenticate('local', {
                                successRedirect: '/admin/criarwebsite',
                                failureRedirect: '/website/login',
                                failureFlash: true
                            })(req, res, next)
                        }).catch(function(err){
                            req.flash('error_msg', 'Houve um erro ao criar usuário, tente novamente.')
                            console.log(err)
                            res.redirect('/admin/cadastro')
                        })
                    })
                })
            }
        }).catch(function(err){
            req.flash('error_msg', "Houve um erro interno.")
            res.redirect('/')
        })
    }
})


router.post('/login', function(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/admin/painel',
        failureRedirect: '/website/login',
        failureFlash: true
    })(req, res, next)
})


router.get('/criarwebsite', eUser, (req, res) => {
    console.log(req.user.email)
    res.render('admin-area/criarwebsite')
})

router.get('/painel', eUser, (req, res) => {
    res.render('admin-area/painel')
})


module.exports = router;