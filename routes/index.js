var express = require('express');
var db = require('../util/db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

/* Rota para exibir mensagem */
router.get("/mensagem", function(req, res){
  res.render('mensagem',{ mensagem : "Você acessou a rota mensagem"});
});

/* Rota de listagem de filmes e series na DB */
router.get("/listar", function(req, res){
  db.query('SELECT * FROM filmes_e_series ORDER BY ano_lancamento, titulo',[],function(erro,resultado){
    if(erro){
      res.status(200).send(erro)
    }
    res.render('lista', { lista: resultado })
  });
});

/* Rota para acessar o cadastro */
router.get('/add', function(req, res) {
  res.render('form', {filme: {}});
});
/* Rota para receber os dados do cadastro */
router.post('/add', function(req, res) {
  db.query('INSERT INTO filmes_e_series(titulo,ano_lancamento)VALUES(?,?)',[req.body.titulo, req.body.ano], function(erro){
    if(erro){
      res.status(200).send('Erro: ' + erro)
    }
    res.redirect('/listar')
  });
});

/* Rota para pegar id dos items */
router.get('/edit/:id', function(req, res){
    db.query('SELECT * FROM filmes_e_series WHERE id = ?',[req.params.id], function(erro, resultado){
        if(erro){
            res.status(200).send('Erro ' + erro)
        }
        res.render('form', {filme: resultado[0]});
    });
});

/* Rota para receber os dados de edição */
router.post('/edit/:id', function(req, res) {
    db.query('UPDATE filmes_e_series SET titulo = ?, ano_lancamento = ? WHERE id = ?',[req.body.titulo, req.body.ano, req.params.id], function(erro){
      if(erro){
        res.status(200).send('Erro: ' + erro)
      }
      res.redirect('/listar')
    });
  });

module.exports = router;
