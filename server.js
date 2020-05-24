const express = require ('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');

//Config
    //Template Engine
    app.engine('handlebars', handlebars({ defaultLayout: 'main'}))
    app.set('views', path.join(__dirname, '/src/views'));
    app.set('view engine', 'handlebars')

//PERSISTÊNCIA
mongoose.connect('mongodb+srv://luisgust08:1234567890@cluster0-pyifx.mongodb.net/test?retryWrites=true&w=majority',
 {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false});

//Configuração do server para usar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//app.use(express.static('./app/public'));
//app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

//Definindo a porta via arquivo de configuração
var port = process.env.port || 3000;

//ROTAS
const indexRoute = require("./src/routes/index-routes");
const gamesRoute = require("./src/routes/games-route");
const userRoute = require("./src/routes/user-route");
const signupRoute = require('./src/routes/singup-route');
const loginRoute = require('./src/routes/login-route');

//Vincular a aplicacao (app) com o motor de rotas
app.use('/', indexRoute);

//Rotas para produtos
app.use('/api/games', gamesRoute);
//Rotas para usuários
app.use('/api/users', userRoute);
//Rotas para Registros
app.use('/api/register', signupRoute);
//Rotas para Login
app.use('/api/login', loginRoute);

app.get('/', function(req,res){
    res.render('login');
})

app.get('/register', function(req, res){
    res.render('cadastro');
})

app.listen(port, () => {
    console.log('Server up and running!');
});