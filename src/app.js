const express = require('express');
const cors = require('cors');

//TESTE DE CONEXAO
const db = require('./config/pg.js');

const app = express();

//middlewares essenciais
app.use(cors());
app.use(express.json());


//log simples das requisições
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})

// rotas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jogoRoutes = require('./routes/jogoRoutes');

// console.log(authRoutes);
// console.log(userRoutes);
// console.log(jogoRoutes);

// Conectando rotas AUTH, JOGO E USER
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/games", jogoRoutes);





//Rota de teste
app.get('/', (req, res) => {
    res.json({ mensagem: 'API de teste funcionando!' });
});



//tratamento de erro
// Rota não encontrada
app.use((req, res) => {
    res.status(404).json({
        erro: `Rota ${req.method} ${req.originalUrl} não encontrada`
    });
});

// Erro interno do servidor
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        erro: 'Erro interno do servidor'
    });
});

// TESTE DE CONEXÃO
db.query('SELECT NOW()')
    .then(result => {
        console.log('Banco conectado!');
        console.log(result.rows[0]);
    })
    .catch(error => {
        console.error(error);
    });


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})
