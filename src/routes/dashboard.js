var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/score/:idUsuario", function (req, res) {
  dashboardController.score(req, res);
});

router.get("/engajamento/:idUsuario", function (req, res) {
  dashboardController.engajamento(req, res);
});


module.exports = router;