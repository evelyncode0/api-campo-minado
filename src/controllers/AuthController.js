const authService = require('../services/AuthService');

// REGISTRO
const registro = async (req, res) => {
    try {
        const resultado = await authService.registro(req.body);

        return res.status(201).json(resultado);

    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        });
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const resultado = await authService.login(req.body);

        return res.status(200).json(resultado);

    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        });
    }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {

    try {

        const resultado = await authService.resetPassword(req.body);

        return res.status(200).json(resultado);


    } catch (error) {

        return res.status(400).json({
            mensagem: error.message
        });

    }
};

module.exports = {
    registro,
    login,
    resetPassword
};