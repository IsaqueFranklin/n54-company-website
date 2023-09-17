const express = require('express');
const router = express.Router()
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');

const website = require('./routes/website');
const admin = require('./routes/admin');
const passport = require('passport')
require('./config/auth')(passport);

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const app = express();

//Config

app.use(session({
    secret: 'minha velha traga meu jantar, sopa, uva, nozes.',
    resave: true,
    saveUninitialized: true
}))


app.use(passport.initialize());
app.use(passport.session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//Middleware

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.user = req.user || null;
    next();
})

//BodyParser

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Handlebars/View Engine

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");

//Mongoose

const mongoId = process.env.mongoId;

mongoose.Promise = global.Promise
mongoose.connect(mongoId).then(function(){
    console.log('Conectado ao mongo')
}).catch(function(err){
    console.log('Erro ao conectar com mongo.')
    console.log(err)
    console.log(mongoId)
})

//Public

app.use(express.static(path.join(__dirname, 'public')))

//routes

app.use('/website', website)
app.use('/admin', admin)

app.get('/', (req, res) => {
    res.render('index')
})

//Starting server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor online')
})