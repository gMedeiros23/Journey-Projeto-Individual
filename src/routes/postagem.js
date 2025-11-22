var express = require("express");
var router = express.Router();

var postagemController = require("../controllers/postagemController");

//Solicitando os dados para postagemController
router.get("/listar", function (req, res) {
  postagemController.listar(req, res);
});

router.get("/listarCategorias", function (req, res) {
  postagemController.listarCategorias(req, res);
});

router.get("/listarTags", function (req, res) {
  postagemController.listarTags(req, res);
});

router.get("/listarPostUsuario/:idUsuario", function (req, res) {
  postagemController.listarPostUsuario(req, res);
});

router.get("/listarComentarios/:idPostagem", function (req, res) {
  postagemController.listarComentarios(req, res);
});

router.post("/cadastrarPost", function (req, res) {
  postagemController.cadastrarPost(req, res);
});



module.exports = router;