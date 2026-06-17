const express = require('express');
const authController = require("../controllers/AuthController");

const router = express.Router();



// /auth/register
router.post('/register', authController.registro);


//  /auth/login
router.post('/login', authController.login);


// //  /auth/reset-password
router.patch('/reset-password', authController.resetPassword);


module.exports = router;