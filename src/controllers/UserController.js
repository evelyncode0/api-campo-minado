const userService = require("../services/UserService.js");

class UserController {

    async getUser(req, res) {
        try {
            const { id } = req.params;

            const result = await userService.getUser(id);

            return res.status(200).json(result);

        } catch (error) {
            return res.status(404).json({
                message: error.message
            });
        }
    }


    async dashboard(req, res) {
        try {
            const { id } = req.params;

            const result = await userService.dashboard(id);

            return res.status(200).json(result);

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    async atualizarSaldo(req, res) {
        try {
            const { id } = req.params;
            const { saldo } = req.body;

            const result = await userService.atualizarSaldo(id, saldo);

            return res.status(200).json(result);

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    async remover(req, res) {
        try {
            const { id } = req.params;

            await userService.remover(id);

            return res.status(200).json({
                message: "Usuário removido com sucesso."
            });

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }
}

module.exports = new UserController();