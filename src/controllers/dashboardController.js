var dashboardModel = require("../models/dashboardModel");

function score(req, res) {
    var idUsuario = req.params.idUsuario;
    dashboardModel.score(idUsuario).then((resultado) => {
    res.status(200).json(resultado);
    });
}

function engajamento(req, res) {
    var idUsuario = req.params.idUsuario;
    dashboardModel.engajamento(idUsuario).then((resultado) => {
    res.status(200).json(resultado);
    });
}

module.exports = {
  score,
  engajamento
};
