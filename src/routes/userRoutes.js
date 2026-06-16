const {Router} = require("express");
const userController = require("../controllers/UserController.js");

const router = Router();


// buscar user por ID 
router.get('/:id' , userController.getUser);

// atualizar saldo do usuario 
router.put('/:id' , userController.atualizarSaldo);

// dashborad do usuer
router.get('/:id/dashboard' , userController.dashboard);

//deletar usuario 
router.delete('/:id' , userController.remover);


module.exports = router;
