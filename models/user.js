const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
	// A query is required on mongoose findOne function
	const query = {username: username}
	User.findOne(query, callback);
}

//Função chamada para adicionar e salvar usuário na base de dados
//É necessario passar um objeto com os dados do novo usuário, e uma função de callback, 
//que contem o erro e os dados do novo usuário
module.exports.addUser = function(newUser, callback){
	//bcrypt serve para criptgrafar a senha do usuário
	//10 é o numero de rounds que o app criptografa
	//salt é uma chave privada para criptografar
	bcrypt.genSalt (10, function(err, salt){
		//bcrypt.hash criar um hash da senha do usuário a partir da senha passada e do salt
		bcrypt.hash(newUser.password, salt,  (err, hash)=>{	
			if (err) 
				throw err;
			//A senha é subreescrita pelo rash e salva no banco de dados
			newUser.password = hash;
			newUser.save(callback);
		})
	});
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, (err, isMatched)=>{
		if (err) throw err;
		callback(null, isMatched);
	})
}