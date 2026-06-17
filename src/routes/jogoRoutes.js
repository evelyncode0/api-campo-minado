// Feito por Guilherme H.
const { Router } = require("express");
const JogoController = require("../controllers/JogoController.js");

const router = Router();

router.post("/start", JogoController.comecarJogo);
router.post("/:gameId/reveal", JogoController.revelarPosicao);
router.post("/:gameId/cashout", JogoController.sacar);

module.exports = router;