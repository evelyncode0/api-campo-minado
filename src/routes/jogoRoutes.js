// Feito por Guilherme H.
const { Router } = require("express");
const JogoController = require("../controllers/JogoController.js");

const router = Router();

router.post("games/start", JogoController.comecarJogo);
router.post("games/:gameId/reveal", JogoController.revelarPosicao);
router.post("games/:gameId/cashout", JogoController.sacar);

module.exports = router;