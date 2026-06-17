// Feito por Guilherme H.
const JogoRepository = require("../repositories/JogoRepository");
const UserRepository = require("../repositories/UserRepository");
class JogoService {
    gerarTabuleiro(){
        const tabuleiro = [];
        const qtdDiamantes = Math.floor(Math.random()* 10) + 1;
        for (let i = 0; i < 5; i++){
            tabuleiro[i] = [];

            for (let j = 0; j < 5; j++) {
                tabuleiro[i][j] = "BOMBA";
            }
        }

        for(let r = 0; r < qtdDiamantes; r++){
            const linha = Math.floor(Math.random()*5);
            const coluna = Math.floor(Math.random()*5);

            if (tabuleiro[linha][coluna] === "BOMBA") {
                tabuleiro[linha][coluna] = "DIAMANTE";
            } else {
                r--;
            }
        }

        return tabuleiro;
    }

    //    FUNÇOES A SEREM IMPLEMENTADAS
       async comecarJogo(dados){
            if(dados.userId)         





           const tabuleiro = this.gerarTabuleiro();
    }
    
       async sacar(){

       }

       async revelarPosicao(){

       }

       async calcularPremio(){

       }
}