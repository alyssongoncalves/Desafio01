/**
 * Arquivo: participante.js
 * Author:  Alysson Gonçalves 
 * Descrição: arquivo responáavel onde trataremos o modelo da classe 'Participante'
 * data: 23/08/2019
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 /**
  * Participante:
  * 
  * -> Id: int
  * -> Nome: String
  * -> Nota1 e 2: Number
  * -> Classe: String
  * 
  */
var ParticipanteSchema = new Schema({
    nome: String,
    classe: String,
    nota1: Number,
    nota2: Number
    
});

module.exports = mongoose.model('Participante', ParticipanteSchema);

//cadÊ o save??? É algo do MongoDb? Eu não conheço isso