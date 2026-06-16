const getUser = async (id) => {

    if (!id) {
        throw new Error("ID é obrigatório");
    }

    // depois vai vir do banco
    return {
        id,
        mensagem: "Buscar usuário no banco "
    };
};


const atualizarSaldo = async (id, saldo) => {

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
};


const remover = async (id) => {

    if (!id) {
        throw new Error("ID é obrigatório");
    }

    return {
        mensagem: "Deletar usuário no banco "
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