const express = require('express');
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const website = require('./routes/website')

const app = express();

//Config

app.use(session({
    secret: 'minha velha traga meu jantar, sopa, uva, nozes.',
    resave: true,
    saveUninitialized: true
}))

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

//Public

app.use(express.static(path.join(__dirname, 'public')))

//routes

//app.use('/web', website)

app.get('/', (req, res) => {
    res.render('index')
})

//Starting server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor online')
})