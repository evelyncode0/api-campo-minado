// Feito por Guilherme H.
const JogoRepository = require("../repositories/JogoRepository");
const UsuarioRepository = require("../repositories/UserRepository");
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

    async revelarPosicao(jogoId, linha, coluna) {

        const jogo = await JogoRepository.buscarJogoPorId(jogoId);

        if (!jogo) {
            throw new Error("JOGO NÃO ENCONTRADO");
        }

        if (jogo.status_jogo !== "EM_ANDAMENTO") {
            throw new Error("JOGO ENCERRADO");
        }

        if (linha < 0 || linha > 4 || coluna < 0 || coluna > 4) {
            throw new Error("POSIÇÃO INVÁLIDA");
        }

        if (!jogo.posicoes_reveladas) {
            jogo.posicoes_reveladas = [];
        }

        const jaRevelada =
            jogo.posicoes_reveladas.some(
                pos =>
                    pos.linha === linha &&
                    pos.coluna === coluna
            );

        if (jaRevelada) {
            throw new Error("POSIÇÃO JÁ REVELADA");
        }

        const posicao = jogo.tabuleiro[linha][coluna];

        if (posicao === "BOMBA") {

            jogo.status_jogo = "PERDEU";
            jogo.premio_atual = 0;

            await JogoRepository.atualizarJogo(jogo.id, jogo);

            return {
                resultado: "BOMBA",
                status: jogo.status_jogo
            };
        }

        jogo.diamantes_encontrados++;

        jogo.premio_atual = this.calcularPremio(jogo.valor_aposta, jogo.diamantes_encontrados);

        jogo.posicoes_reveladas.push({
            linha,
            coluna
        });

        await JogoRepository.atualizarJogo(jogo.id, jogo);

        return {
            resultado: "DIAMANTE",
            diamantes_encontrados: jogo.diamantes_encontrados,
            premio_atual: jogo.premio_atual,
        };
    }

    calcularPremio(aposta, diamantes) {
        return aposta * (1 + (diamantes * 0.33));
    }

    async sacar(jogoId) {

        const jogo = await JogoRepository.buscarJogoPorId(jogoId);

        if (!jogo) {
            throw new Error("JOGO NÃO ENCONTRADO")
        }

        if (jogo.status_jogo === "FINALIZADO") {
            throw new Error("JOGO NÃO ENCONTRADO");
        }

        if (jogo.status_jogo !== "EM_ANDAMENTO") {
            throw new Error("JOGO ENCERRADO");
        }

        const usuario = await UsuarioRepository.buscarUsuarioPorId(jogo.usuario_id);

        if (!usuario) {
            throw new Error("USUÁRIO NÃO ENCONTRADO");
        }

        const novoSaldo = Number(usuario.saldo) + Number(jogo.premio_atual);

        await UsuarioRepository.atualizarSaldo(usuario.id, novoSaldo);

        await JogoRepository.finalizarJogo(jogo.id);

        return {
            premio: jogo.premio_atual,
            saldoAtual: novoSaldo,
            status: "FINALIZADO"
        };
    }

    async comecarJogo(userId, valorAposta) {

        const jogoExistente = await JogoRepository.buscarJogoEmAndamento(userId);
        
         if (jogoExistente) {
            throw new Error("JÁ EXISTE UM JOGO EM ANDAMENTO");
        }

        const usuarioExistente = await UsuarioRepository.buscarUsuarioPorId(userId);

        if (!usuarioExistente) {
            throw new Error("USUÁRIO NÃO EXISTE");
        }

        const saldoUser = await UsuarioRepository.getSaldo(userId);

        if (saldoUser.saldo < valorAposta) {
            throw new Error("SALDO MENOR QUE O VALOR DA APOSTA");
        }

        if (valorAposta <= 0) {
            throw new Error("VALOR DE APOSTA INVÁLIDO");
        }

        const novoSaldo = usuarioExistente.saldo - valorAposta;

        await UsuarioRepository.atualizarSaldo(userId, novoSaldo);

        const tabuleiro = this.gerarTabuleiro();

        //PRINTS PARA TESTES 
        console.log("ID do usuario:", userId)
        console.log(tabuleiro); 

        const jogo = {
            usuario_id: userId,
            valor_aposta: valorAposta,
            premio_atual: valorAposta,
            diamantes_encontrados: 0,
            status_jogo: "EM_ANDAMENTO",
            tabuleiro,
            posicoes_reveladas: []
        };


        const jogoCriado =
            await JogoRepository.criarJogo(jogo);

        return {
            gameId: jogoCriado.id
        };
    }
}


module.exports = new JogoService();