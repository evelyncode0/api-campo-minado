-- Criar banco de dados
CREATE DATABASE campominado_db;
-- Conectar ao banco
\c campominado_db;
-- Criar tabela de usuarios
CREATE TABLE IF NOT EXISTS Usuario (
id SERIAL PRIMARY KEY,
nome VARCHAR(150) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
data_nasc  DATE NOT NULL,
senha VARCHAR(255) NOT NULL,
confirmar_senha VARCHAR(255) NOT NULL,
saldo NUMERIC(10, 2) DEFAULT 0,
data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Criar tabela de jogos
CREATE TABLE IF NOT EXISTS Jogo (
id SERIAL PRIMARY KEY,
usuario_id INTEGER NOT NULL,
valor_aposta NUMERIC(10, 2) NOT NULL,
premio_atual NUMERIC(10, 2) DEFAULT 0,
diamantes_encontrados INTEGER DEFAULT 0,
status VARCHAR(20) DEFAULT 'em andamento',
tabuleiro JSONB NOT NULL,
posicoes_reveladas JSONB,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

constraint fk_usuario
  foreign key(usuario_id) 
    references Usuario(id)
    on delete cascade --ao excluir um usuário, excluir seus jogos
);
-- Inserir dados iniciais
INSERT INTO  () VALUES