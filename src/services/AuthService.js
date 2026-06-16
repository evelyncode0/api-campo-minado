const registro = async (dados) => {

    const {
        nome,
        email,
        dataNascimento,
        senha,
        confirmacaoSenha
    } = dados;

    // 1. validar campos obrigatórios
    if (!nome || !email || !dataNascimento || !senha || !confirmacaoSenha) {
        throw new Error("Todos os campos são obrigatórios");
    }

    // 2. validar senhas iguais
    if (senha !== confirmacaoSenha) {
        throw new Error("As senhas não coincidem");
    }

    // 3. validar senha forte
    const regexSenha =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!regexSenha.test(senha)) {
        throw new Error("Senha fora do padrão");
    }

    // VERIFICAR EMAIL DUPLICADO
    const emailExiste = usuarios.find(u => u.email === email);
    if (emailExiste) {
        throw new Error("Email já cadastrado");
    }

    // 4. simulação de criação de usuário 
    const novoUsuario = {
        id: Date.now(), // temporário
        nome,
        email,
        dataNascimento
    };

    return {
        mensagem: "Usuário criado com sucesso",
        usuario: novoUsuario
    };
};


const login = async (dados) => {

    const { email, senha } = dados;

    // 1. validar campos
    if (!email || !senha) {
        throw new Error("Email e senha são obrigatórios");
    }

    // 2. simular usuário do banco 
    const usuarioTeste = {
        id: 1,
        nome: "hian",
        email: "hian@email.com",
        dataNascimento: "2005-09-10",
        senha: "123456"
    };

    // 3. verificar email
    if (email !== usuarioTeste.email) {
        throw new Error("Usuário não encontrado");
    }

    // 4. verificar senha
    if (senha !== usuarioTeste.senha) {
        throw new Error("Senha inválida");
    }

    // 5. retornar dados (SEM senha)
    return {
        nome: usuarioTeste.nome,
        email: usuarioTeste.email,
        dataNascimento: usuarioTeste.dataNascimento
    };
};

module.exports = {
    registro,
    login
};