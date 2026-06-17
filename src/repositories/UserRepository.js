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

    const result = await pool.query(
        `
        SELECT
            COUNT(*) AS totaljogos
        FROM Jogo
        WHERE usuario_id = $1
        `,
        [id]
    );


    return result.rows[0];
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


module.exports = {
    criarUsuario,
    buscarEmail,
    buscarUsuarioPorId,
    deletarUsuario,
    atualizarSaldo,
    buscarDashboard,
    atualizarSenha,
    getUser
};