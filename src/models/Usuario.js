//Feito por Evelyn G
class Usuario {
    constructor(id, nome, email, data_nasc, senha, confirmar_senha, saldo) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.data_nasc = data_nasc;
        this.senha = senha;
        this.confirmar_senha = confirmar_senha;
        this.saldo = saldo;
    }
    static fromRow(row) {
        return new Usuario();
    }
}
module.exports = Usuario;