const pool = require('../config/pg');

const criarJogo = async (jogo) => {
    const query = `INSERT INTO Jogo (
    usuario_id,
    valor_aposta,
    premio_atual,
    diamantes_encontrados,
    status_jogo,
    tabuleiro,
    posicoes_reveladas
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;`

    const values = [
        jogo.usuario_id,
        jogo.valor_aposta,
        jogo.premio_atual,
        jogo.diamantes_encontrados,
        jogo.status_jogo,
        jogo.tabuleiro,
        jogo.posicoes_reveladas
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};



const buscarJogoPorId = async (id) => {
   const result = await pool.query(
        'SELECT * FROM Jogo WHERE id = $1;',
        [id]
    );

    return result.rows[0];
};

const buscarJogoEmAndamento = async (usuario_id) => {
        const result = await pool.query (`SELECT * FROM Jogo WHERE usuario_id = $1
        AND status_jogo = 'EM_ANDAMENTO';`,
        [usuario_id]);
    return result.rows[0];    
};

const buscarJogosPorUsuario = async (usuario_id) => {
   const result = await pool.query ('SELECT * FROM Jogo WHERE usuario_id = $1;',
    [usuario_id] );

    return result.rows;
}

const atualizarJogo = async (id, dados) => {
    const result = await pool.query (`UPDATE Jogo
    SET
        premio_atual = $1,
        diamantes_encontrados = $2,
        posicoes_reveladas = $3,
        status_jogo = $4
    WHERE id = $5
    RETURNING *;`,
    
    [
        dados.premio_atual,
        dados.diamantes_encontrados,
        dados.posicoes_reveladas,
        dados.status_jogo,
        id
    ]
);

    return result.rows[0];
};

const finalizarJogo = async (id) => {
    const result = await pool.query (`UPDATE Jogo
    SET status_jogo = 'FINALIZADO'
    WHERE id = $1
    RETURNING *;`,
    [id] );

    return result.rows[0];
};

module.exports = {
    criarJogo,
    buscarJogoPorId,
    buscarJogoEmAndamento,
    buscarJogosPorUsuario,
    atualizarJogo,
    finalizarJogo
};