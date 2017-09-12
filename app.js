const express = require('express');
const path = require ('path');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const passport = require ('passport');
const mongoose = require ('mongoose');

//Conecta o servidor a base de dados
//Criar uma variavel que acessa o arquivo database dentro da pasta config
const configDB = require ('./config/database');
//Conecta mongoose a aplicação. A base de dados é descrita 
//no objeto do arqivo config. E a chave db refere-se a base de dados
mongoose.connect(configDB.database);
//Check se conectou corretamente
mongoose.connection.on('connected', function(){
	console.log ('Conecteded to database '+ configDB.database);
});
//Checagem de erros
mongoose.connection.on('error', function(err){
	console.log ('Fail to conect to database | '+ err);
});

//Inicializa o app com express e define uma porta como constante
const app = express();
const port = 3000;


//Arquivo para deinição da rota /users , para organização
const users = require('./routes/users');


//app.use = middleware -> Abaixo segue a lista de todos os Middlewares necessários
//Any domain can make requests to this server. Otherwise it would be blocked
app.use(cors());

//Body Parser Middleware
app.use(bodyParser.json());

//Middleware para definição da rota /users
app.use('/users', users);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


//Set Static folder 
//Essa pasta contem toda a parte do Angular JS
app.use(express.static(path.join(__dirname, 'public')));

app.get ('*', (req, res,next)=>{
	res.sendFile(path.join(__dirname + 'public/index.html'));
})
//Lida com requisição get na pasta root
app.get('/', function(req, res){
	res.send ('Invalid Endpoint');
})

//Executa a o aplicativo na porta definica. Start Server
app.listen(port, function(){
	console.log("server started on port " + port);
})