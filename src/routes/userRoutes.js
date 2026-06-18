// feito por hian
const {Router} = require("express");
const userController = require("../controllers/UserController.js");

const router = Router();


// buscar user por ID 
//users/id
router.get('/:id' , userController.getUser);

// atualizar saldo do usuario 
//users/id
router.put('/:id' , userController.atualizarSaldo);

// dashborad do usuer
//users/id/dashboard
router.get('/:id/dashboard' , userController.dashboard);

//deletar usuario 
//users/id
router.delete('/:id' , userController.remover);


module.exports = router;
