//NOME DAS TABELAS COM LETRA MAIUSCULA (Jogo, Usuario)

const pool = require('../config/pg');

const criarUsuario = async (usuario) => {
    const query = `
        INSERT INTO Usuario (nome, email, data_nasc, senha, saldo)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const values = [
        usuario.nome,
        usuario.email,
        usuario.data_nasc,
        usuario.senha,
        usuario.saldo || 0
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const buscarEmail = async (email) => {
    const result = await pool.query(
        'SELECT * FROM Usuario WHERE email = $1',
        [email]
    );

    return result.rows[0];
};

const buscarUsuarioPorId = async (id) => {
    const result = await pool.query(
        'SELECT * FROM Usuario WHERE id = $1',
        [id]
    );

    return result.rows[0];
};

const getUser = async (id) =>{
    const result = await pool.query(
        'SELECT id, nome, email, saldo FROM Usuario WHERE id = $1',
        [id]
    );
    return result.rows[0];
};

const deletarUsuario = async (id) => {
    const result = await pool.query(
        'DELETE FROM Usuario WHERE id = $1 RETURNING *',
        [id]
    );

    return result.rows[0];
};


const atualizarSaldo = async (id, saldo) => {

    const result = await pool.query(
        `
        UPDATE Usuario
        SET saldo = $1
        WHERE id = $2
        RETURNING *
        `,
        [saldo, id]
    );

    return result.rows[0];
};

const buscarDashboard = async (id) => {

    const totalJogos = await pool.query(
        `
        SELECT COUNT(*) AS total_jogos
        FROM Jogo
        WHERE usuario_id = $1
        `,
        [id]
    );

    const vitorias = await pool.query(
        `
        SELECT COUNT(*) AS vitorias
        FROM Jogo
        WHERE usuario_id = $1
        AND status_jogo = 'FINALIZADO'
        `,
        [id]
    );

    const derrotas = await pool.query(
        `
        SELECT COUNT(*) AS derrotas
        FROM Jogo
        WHERE usuario_id = $1
        AND status_jogo = 'PERDEU'
        `,
        [id]
    );

    const valorGanho = await pool.query(
        `
        SELECT COALESCE(SUM(premio_atual), 0) AS valor_ganho
        FROM Jogo
        WHERE usuario_id = $1
        AND status_jogo = 'FINALIZADO'
        `,
        [id]
    );

    const valorPerdido = await pool.query(
        `
        SELECT COALESCE(SUM(valor_aposta), 0) AS valor_perdido
        FROM Jogo
        WHERE usuario_id = $1
        AND status_jogo = 'PERDEU'
        `,
        [id]
    );

    return {
        total_jogos: totalJogos.rows[0].total_jogos,
        vitorias: vitorias.rows[0].vitorias,
        derrotas: derrotas.rows[0].derrotas,
        valor_ganho: valorGanho.rows[0].valor_ganho,
        valor_perdido: valorPerdido.rows[0].valor_perdido
    };
};

const atualizarSenha = async (id, novaSenha) => {

    const result = await pool.query(
        `
        UPDATE Usuario
        SET senha = $1
        WHERE id = $2
        RETURNING *
        `,
        [novaSenha, id]
    );

    return result.rows[0];
};

const getSaldo = async (id) =>{
    const result = await pool.query (
        "SELECT id, saldo FROM Usuario WHERE id = $1",
    [id]
    );

    return result.rows[0];
};


module.exports = {
    criarUsuario,
    buscarEmail,
    buscarUsuarioPorId,
    deletarUsuario,
    atualizarSaldo,
    buscarDashboard,
    atualizarSenha,
    getUser,
    getSaldo
};