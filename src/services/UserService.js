const userRepository = require('../repositories/UserRepository');

const getUser = async (id) => {

    if (!id) {
        throw new Error("ID é obrigatório");
    }

    const usuario = await userRepository.getUser(id);

    // puxa do banco
    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        saldo: usuario.saldo
       
    };
};


const atualizarSaldo = async (id, saldo) => {
    const usuario = await userRepository.atualizarSaldo(id, saldo);

    if (!id) {
        throw new Error("ID é obrigatório");
    }

    if (saldo === undefined) {
        throw new Error("Saldo é obrigatório");
    }

    if (saldo < 0) {
        throw new Error("Saldo não pode ser negativo");
    }

    return {
        mensagem: "Atualizar saldo no banco "
    };

    return {
        id: usuario.id,
        saldo: usuario.saldo
    }
};


const remover = async (id) => {

    const usuario = await userRepository.deletarUsuario(id);
    
    if (!id) {
        throw new Error("ID é obrigatório");
    }

    return {
        id: usuario.id
    };
};


const dashboard = async (id) => {

    if (!id) {
        throw new Error("ID é obrigatório");
    }

    return {
        mensagem: "Buscar dashboard no banco"
    };
};


module.exports = {
    getUser,
    atualizarSaldo,
    remover,
    dashboard
};