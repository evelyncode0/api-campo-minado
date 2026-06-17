const JogoService = require("../services/JogoService.js");

class JogoController {

    async comecarJogo(req, res) {
        try {
            const result = JogoService.comecarJogo();
        } catch (error) {

        };
    }


    //    Falta Implementar a service para eu criar
    async revelarPosicao(req, res) {
        try {
        } catch (error) {

        }
    };

    async sacar(req, res) {
        try {

        } catch (error) {

        }
    };
};

module.exports = new JogoController();