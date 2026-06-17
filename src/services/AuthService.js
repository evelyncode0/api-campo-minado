const userRepository = require('../repositories/UserRepository');

const registro = async (dados) => {

    const {
        nome,
        email,
        data_nasc,
        senha,
        confirmacaoSenha
    } = dados;

    if (!nome || !email || !data_nasc || !senha || !confirmacaoSenha) {
        throw new Error("Todos os campos são obrigatórios");
    }

    const senhaValida = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!senhaValida.test(senha)) {
        throw new Error(
            "A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial"
        );
    }

    if (senha !== confirmacaoSenha) {
        throw new Error("As senhas não coincidem");
    }

    const emailExiste = await userRepository.buscarEmail(email);
    if (emailExiste) {
        throw new Error("Email já cadastrado");
    }

    const novoUsuario = {
        nome,
        email,
        data_nasc,
        senha,
        saldo: 0
    };

    const usuarioCriado = await userRepository.criarUsuario(novoUsuario);

    return {
        mensagem: "Usuário criado com sucesso",
        usuario: {
            id: usuarioCriado.id,
            nome: usuarioCriado.nome,
            email: usuarioCriado.email,
            data_nascimento: usuarioCriado.data_nasc
        }
    };
};

const login = async (dados) => {

    const { email, senha } = dados;

    if (!email || !senha) {
        throw new Error("Email e senha são obrigatórios");
    }

    const usuario = await userRepository.buscarEmail(email);

    if (!usuario) {
        throw new Error("Usuário não encontrado");
    }

    if (usuario.senha !== senha) {
        throw new Error("Senha incorreta");
    }

    return {
        mensagem: "Login realizado com sucesso",
        usuario: {
            nome: usuario.nome,
            email: usuario.email,
            data_nasc: usuario.data_nasc
        }
    };
};

const resetPassword = async (dados) => {

    const { id, novaSenha } = dados;

    const usuario = await userRepository.buscarUsuarioPorId(id);

    if (!usuario) {
        throw new Error("Usuário não encontrado");
    }

    const senhaValida = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!senhaValida.test(novaSenha)) {
        throw new Error(
            "A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial"
        );
    }

    if (novaSenha === usuario.senha) {
        throw new Error(
            "A nova senha não pode ser igual à senha atual"
        );
    }

    await userRepository.atualizarSenha(
        id,
        novaSenha
    );

    return {
        mensagem: "Senha atualizada com sucesso!"
    };
};


module.exports = {
    registro,
    login,
    resetPassword

};