// Feito por Guilherme H.
const { Router } = require("express");
const JogoController = require("../controllers/JogoController.js");

const router = Router();

// Começar o jogo
router.post("/start", JogoController.comecarJogo);
// Revelar posição no tabuleiro
router.post("/:gameId/reveal", JogoController.revelarPosicao);
// Sacar o valor do premio e finalizar o jogo
router.post("/:gameId/cashout", JogoController.sacar);

module.exports = router;