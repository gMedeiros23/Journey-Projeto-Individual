var postagemModel = require("../models/postagemModel");

function listar(req, res) {
  postagemModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listarCategorias(req, res) {
  postagemModel.listarCategorias().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listarTags(req, res) {
  postagemModel.listarTags().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listarPostUsuario(req, res) {
  var idUsuario = req.params.idUsuario;
  postagemModel.listarPostUsuario(idUsuario).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listarComentarios(req, res) {
  var idPostagem = req.params.idPostagem;
  postagemModel.listarComentarios(idPostagem).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrarPost(req, res) {

  var categoria = req.body.categoriaJson;
  var tags = req.body.tagsJson;
  var titulo = req.body.tituloJson;
  var conteudo = req.body.conteudoJson;
  var id_usuario = req.body.idusuarioJson;


  postagemModel.cadastrarPost(categoria, tags, titulo, conteudo, id_usuario)
    .then(
      function (resultado) {
        res.json(resultado);
      }
    ).catch(
      function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      }
    );
}

function criarComentario(req, res) {

  var conteudo = req.body.conteudo;
  var id_usuario = req.body.idusuario;
  var idpostagem = req.body.idpostagem;


  postagemModel.criarComentario(conteudo, id_usuario, idpostagem)
    .then(
      function (resultado) {
        res.json(resultado);
      }
    ).catch(
      function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      }
    );
}

module.exports = {
  listar,
  cadastrarPost,
  listarCategorias,
  listarTags,
  listarPostUsuario,
  listarComentarios,
  criarComentario
};
