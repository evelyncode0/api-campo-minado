const db = require('../config/pg');

const criarUsuario = async (usuario) => {
    const query = `
        INSERT INTO usuarios (nome, email, data_nascimento, senha, saldo)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const values = [
        usuario.nome,
        usuario.email,
        usuario.dataNascimento,
        usuario.senha,
        usuario.saldo || 0
    ];

    const result = await db.query(query, values);
    return result.rows[0];
};

const buscarEmail = async (email) => {
    const result = await db.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
    );

    return result.rows[0];
};

const buscarUsuarioPorId = async (id) => {
    const result = await db.query(
        'SELECT id, nome, email, data_nascimento, saldo FROM usuarios WHERE id = $1',
        [id]
    );


    return result.rows[0];
};

const deletarUsuario = async (id) => {
    const result = await db.query(
        'DELETE FROM usuarios WHERE id = $1 RETURNING *',
        [id]
    );

    return result.rows[0];
};

module.exports = {
    criarUsuario,
    buscarEmail,
    buscarUsuarioPorId,
    deletarUsuario
};