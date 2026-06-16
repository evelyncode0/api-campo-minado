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
saldo NUMERIC(10, 2) DEFAULT 0 CHECK (saldo >= 0), --Permite 10 digitos e 2 casas decimais, e todo usuario começa com 0
data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Criar tabela de jogos
CREATE TABLE IF NOT EXISTS Jogo (
id SERIAL PRIMARY KEY,
usuario_id INTEGER NOT NULL,
valor_aposta NUMERIC(10, 2) NOT NULL CHECK (valor_aposta > 0),
premio_atual NUMERIC(10, 2) DEFAULT 0 CHECK (premio_atual >= 0),
diamantes_encontrados INTEGER DEFAULT 0,
status_jogo VARCHAR(20)
CHECK (
 status_jogo IN (
   'EM_ANDAMENTO',
   'PERDEU',
   'FINALIZADO'
 )
)
DEFAULT 'EM_ANDAMENTO',
tabuleiro JSONB NOT NULL, --salva estruturas json diretamente no postgresql
posicoes_reveladas JSONB,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

constraint fk_usuario
  foreign key(usuario_id) 
    references Usuario(id)
    on delete cascade --ao excluir um usuário, excluir seus jogos
);
