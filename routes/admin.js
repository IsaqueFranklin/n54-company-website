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

const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: "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"
});

//const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();


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
                            req.flash('info', 'Houve um erro ao criar usuário, tente novamente.')
                            console.log(err)
                            res.redirect('/admin/cadastro', { messages: req.flash('info') })
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

router.get('/logout', eUser, function(req, res){
    req.logout(() => {
        req.flash('success_msg', 'Deslogado com sucesso.')
        res.redirect('/')
    })
})


router.get('/criarwebsite', eUser, (req, res) => {
    res.render('admin-area/criarwebsite')
})

router.get('/painel', eUser, (req, res) => {
    res.render('admin-area/painel')
})

router.get('/chad', eUser, (req, res) => {
    res.render('admin-area/ia')
})

router.get('/sites', eUser, (req, res) => {
    res.render('admin-area/meusites')
})

router.get('/perfil', eUser, (req, res) => {
    res.render('admin-area/perfil')
})

router.get('/settings', eUser, (req, res) => {
    res.render('admin-area/config')
})

router.post('/chatgpt', async (req, res) => {
    try {
        console.log("Até aqui tudo bem.");
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": "Você é uma inteligência artificial que criar textos para as principais seções de websites, e me retorna cada um separadamente dentro de um arquivo JSON, com base no nome da empresa e de um breve resumo do que ela faz."},
                {"role": "user", "content": "Escreva os conteúdos de um site de uma empresa foguetes chamada Blastar."},
            ],
          });
          console.log(chatCompletion.choices[0].message.content.nomeEmpresa);
          res.redirect('/')
    } catch (error) {
        console.log(error.message);
        res.redirect('/website/login')
    }
})


module.exports = router;