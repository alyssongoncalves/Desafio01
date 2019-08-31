/**
 * 
 * Arquivo: server.js
 * Descrição:
 * author: Alysson Gonçalves
 * Data de criação: 23/08/2019
 * 
 */

 // configurar o Setup da  App:

 // Chamadas dos pacotes
 var  express = require('express');
 var app = express();
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');
 var Participante = require('./app/models/participante');

 mongoose.Promise = global.Promise;


 //Manaiera local: mongoDb
 mongoose.connect('mongodb://localhost:27017/desafio01', { 
   useNewUrlParser: true }); 

 // Configuração da variavel app para usar o 'badyParser()':
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());

 // Definindo  a porte aonde será executada a API:
 var port = process.env.port || 8000;


 // Rotas da API:
 //==================================================================================================

 // Criando uma instância das rotas via Express 
 var router = express.Router();

 router.use(function(req, res, next){
   console.log('Algo está acontcendo aqui...');
   next();
});

//  Rota de Exemplo 
router.get('/', function(req, res){
   res.json({ message: 'Bem vindo(a) Página cadastro'})

 });


//API's:
//===================================================================================================

// Rotas que terminarem com '/participantes' (servir: GET ALL & POST)
  router.route('/participantes')

   /* 1) Método: Cadastrar um participante (acessar em: POST htpp://localhost:8000/api/participantes) */
   .post(function(req, res){
      //aqui você está instanciando um objeto da classe participante
      var participante = new Participante();

      //setou as propriedades
      //Aqui vamos setar os campos do Participante (via request):
      participante.nome = req.body.nome;
      participante.classe = req.body.classe;
      participante.nota1 = req.body.nota1;
      participante.nota2 = req.body.nota2;
      

      //aqui você está chamando o método save da classe Participante.
      participante.save(function(error){
         if(error)
            res.send('Erro ao tentar cadrastrar Participante...' + error);
         res.json({ message: 'Participante cadastrado com sucesso!'});  
      });
    })
   
    /* 2) Método: Selecionar todos os Participantes (acessar em: GET htpp://localhost:8000/api/participantes) */
   .get(function(req, res){
      Participante.find(function(error, participantes){
         if(error)
            res.send('Erro ao tentar selecionar todos os participantes... ' + error);
            res.json(participantes);
      });
   });
   // Rotas que irão terminar em '/participantes/:participante_id' (Servir tanto para : GET, PUT & DELETE: id);
   router.route('/participantes/:participante_id')

   /* 3) Método: Selecionar por Id: (acessar em: GET http://localhost:8000/api/participantes/:participante_id) */
   .get(function(req, res){
      //função para selecionar determinado produto por ID - Irá verificar se caso não encontrar um determinado
      //Participante pelo id... retorna uma mensagem de error:
      Participante.findById(req.params.participante_id, function(error, participante){
         if(error)
            res.send('Id do participante não econtrado...' + error);
         res.json(participante);   
      });
   })
   /* 4) Método: Atualizar por ID: (acessar em: PUT http://localhost:8000/api/participantes/:participante_id) */
   .put(function(req, res){
      
      // Primeiro: para atualizarmos, precisamos primeiro achar o 'id' do 'participante':
      Participante.findById(req.params.participante_id, function(error, participante){
         if(error)
         res.send("Id do participante não encontrado..." + error);
      
         // Segundo:
         participante.nome = req.body.nome;
         participante.classe = req.body.classe;
         participante.nota1 = req.body.nota1;
         participante.nota2 = req.body.nota2;

            //Terceiro: Agora que ja atulizamos os dados, vamos salvar as propriedades:
            participante.save(function(error){
               if(error)
                  res.send('Erro ao atualizar participante...' + error);
               
               res.json({ message: 'Participante atualizado com sucesso!'});
            });

      });
   })
   /* 5) Método: Excluir por id (acessar http://localhost:8000/api/participantes/:participante_id) */
   .delete(function(req, res){

      Participante.remove({
         _id: req.params.participante_id
         }, function(error){
            if(error)
               res.send("Id do Participante não encontrado..." + error);
            
            res.json({ message: 'Participante Excluído com Sucesso'});
         });
      });

// Definindo um padrão das rotas prefixadas: '/api':
app.use('/api', router);

 // Iniciando a Aplicação (servidor):
app.listen(port);
console.log("Inicando app na porta " + port);