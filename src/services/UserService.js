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
    
    if (!id) {
        throw new Error("ID é obrigatório");
    }

    if (saldo === undefined) {
        throw new Error("Saldo é obrigatório");
    }

    if (saldo < 0) {
        throw new Error("Saldo não pode ser negativo");
    }

    const usuario = await userRepository.atualizarSaldo(id, saldo);


    return {
        mensagem: `Saldo do usuario ${id} atualizado!`
    };

    return {
        id: usuario.id,
        saldo: usuario.saldo
    }
};


const remover = async (id) => {
    
    if (!id) {
        throw new Error("ID é obrigatório");
    }

     const usuario = await userRepository.deletarUsuario(id);

    return {
        id: usuario.id
    };
};


const dashboard = async (id) => {
    
    if (!id) {
        throw new Error("ID é obrigatório");
    }

    const dados = await userRepository.buscarDashboard(id);

    return {
        totalJogos: Number(dados.total_jogos),
        vitorias: Number(dados.vitorias),
        derrotas: Number(dados.derrotas),
        valorGanho: Number(dados.valor_ganho),
        valorPerdido: Number(dados.valor_perdido)
    };
};


module.exports = {
    getUser,
    atualizarSaldo,
    remover,
    dashboard
};