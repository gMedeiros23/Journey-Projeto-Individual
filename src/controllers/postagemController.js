var postagemModel = require("../models/postagemModel");

function listar(req, res) {
  postagemModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

module.exports = {
  listar
};
