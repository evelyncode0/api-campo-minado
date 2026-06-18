//Feito por Evelyn G
const Usuario = require("./Usuario");
const { fromRow } = require("./Usuario");

class Jogo {
    constructor(id, usuario_id, valor_aposta, premio_atual, diamantes_encontrados, status_jogo, tabuleiro, posicoes_reveladas ){
    this.id = id;
    this.usuario_id = usuario_id;
    this.valor_aposta = valor_aposta;
    this.premio_atual = premio_atual;
    this.diamantes_encontrados = diamantes_encontrados;
    this.status_jogo = status_jogo;
    this.tabuleiro = tabuleiro;
    this.posicoes_reveladas = posicoes_reveladas;
    }
    static fromRow(row){
        return new Usuario();
    }
}
module.exports = Usuario;