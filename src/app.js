const express = require('express');
const cors = require('cors');

const app = express();

//middlewares essenciais
app.use(cors());
app.use(express.json());

//log simples das requisições
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})

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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})
