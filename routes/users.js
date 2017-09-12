const express = require('express');
const router = express.Router();
const user = require('../models/user');
const passport = require ('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');

//Este arquivo já está na rota /users.

//Base route. 
router.get ('/', function(req, res, next){
	res.send('User Route');
});

//Register route. 
router.post ('/register', function(req, res, next){
	//Criar um novo usuário pegando dados do corpo da pagina
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});

	//Adicionar o usuário a base de dados, e callback com mensagens de erro ou sucesso
	User.addUser(newUser, function(err, user){
		if(err){
			res.json({success: false, msg: 'Falha ao registrar usuário. Porfavor, tente novamente'});
		}
		else{
			res.json({success: true, msg: 'Usuário registrado com sucesso'});			
		}		
	});
});

//Authenticate route. 
router.post ('/authenticate', function(req, res, next){
	const username = req.body.username;
	const password = req.body.password;

	//Check username
	User.getUserByUsername(username, (err, user)=>{
		//Check for errors
		if (err) throw err;
		//If there is no user send a msg
		if (!user){
			return res.json({success: false, msg: 'Usuário não cadastrado'});
		}

		//Check if password is correct
		User.comparePassword(password, user.password, (err, isMatched) => {
			//check for errors
			if (err) throw err;
			//See if typed password matches what is in the database
			if (isMatched){
				//get jwt token based on secret on config database file
				const token = jwt.sign(user,config.secret, {
					expiresIn: 604800 //Login exires after one week
				});

				//Send sucess msg back if succeded
				res.json({
					success: true,
					token: 'JWT ' +token,
					//send back object with all info but the pssword
					user: {
						id: user._id,
						name: user.name,
						username: user.username,
						email: user.email
					}
				});
			}
			//if there is no match
			else {
				//send msg
				return res.json({success: false, msg: 'Senha incorreta'});				
			}
		});
	});
});

//Profile route. 
router.get ('/profile', passport.authenticate('jwt', {session: false}), function(req, res, next){
	res.json({user: req.user});
	//
});

//Validation route. 
router.get ('/validade', function(req, res, next){
	res.send('VALIDATION');
});

//Exporta o router. É necessário para o funcionamento das rotas
module.exports = router;