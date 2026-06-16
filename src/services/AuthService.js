const userRepository = require('../repositories/UserRepository');

const registro = async (dados) => {

    const {
        nome,
        email,
        dataNascimento,
        senha,
        confirmacaoSenha
    } = dados;

    if (!nome || !email || !dataNascimento || !senha || !confirmacaoSenha) {
        throw new Error("Todos os campos são obrigatórios");
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
        dataNascimento,
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
            dataNascimento: usuarioCriado.data_nascimento
        }
    };
};