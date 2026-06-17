const JogoService = require("../services/JogoService");

class JogoController {

    async comecarJogo(req, res) {
        try {

            const { userId, valorAposta } = req.body;

            const jogo =
                await JogoService.comecarJogo(
                    userId,
                    valorAposta
                );

            return res.status(201).json(jogo);

        } catch (error) {

            return res.status(400).json({
                erro: error.message
            });
        }
    }

    async revelarPosicao(req, res) {
        try {

            const { gameId } = req.params;
            const { linha, coluna } = req.body;

            const resultado =
                await JogoService.revelarPosicao(
                    gameId,
                    linha,
                    coluna
                );

            return res.status(200).json(
                resultado
            );

        } catch (error) {

            return res.status(400).json({
                erro: error.message
            });
        }
    }

    async sacar(req, res) {
        try {

            const { gameId } = req.params;

            const resultado =
                await JogoService.sacar(
                    gameId
                );

            return res.status(200).json(
                resultado
            );

        } catch (error) {

            return res.status(400).json({
                erro: error.message
            });
        }
    }
}

module.exports = new JogoController();