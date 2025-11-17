var express = require("express");
var router = express.Router();

var postagemController = require("../controllers/postagemController");

//Solicitando os dados para postagemController
router.get("/listar", function (req, res) {
  postagemController.listar(req, res);
});

module.exports = router;