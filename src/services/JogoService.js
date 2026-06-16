class JogoService {
    gerarTabuleiro() {
        const tabuleiro = [];
        const qtdDiamantes = Math.floor(Math.random() * 10) + 1;
        for (let i = 0; i < 5; i++) {
            tabuleiro[i] = [];

            for (let j = 0; j < 5; j++) {
                tabuleiro[i][j] = "BOMBA";
            }
        }

        for (let r = 0; r < qtdDiamantes; r++) {
            const linha = Math.floor(Math.random() * 5);
            const coluna = Math.floor(Math.random() * 5);

            if (tabuleiro[linha][coluna] === "BOMBA") {
                tabuleiro[linha][coluna] = "DIAMANTE";
            } else {
                r--;
            }
        }

        return tabuleiro;
    }


    revelarPosicao(tabuleiro, linha, coluna) {
        const posicao = tabuleiro[linha][coluna];

        if (posicao === "BOMBA") {
            return{
                resultado: "BOMBA",
                perdeu:true
            };
        return{
            resultado: ""
        }
        }
    //    FUNÇOES A SEREM IMPLEMENTADAS
       
       async sacar(){

        }

       async revelarPosicao(){

        }

       async calcularPremio(){

        }
    }

module.exports = new JogoService();