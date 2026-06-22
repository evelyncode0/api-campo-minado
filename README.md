# API Campo Minado
API REST desenvolvida em Node.js para uma plataforma de apostas
baseada no jogo Campo Minado.

## Tecnologias Utilizadas
* Node.js
* Express.js
* PostgreSQL
* dotenv
* cors
  
## Integrantes
* Evelyn Gregorio
* Guilherme Hermes
* Hian Oliveira

  
## Instalação e Configuração
Clone o repositório:
git clone https://github.com/evelyncode0/api-campo-minado

Acesse a pasta do projeto:
cd api-campo-minado

Crie um arquivo .env na raiz do projeto e cole esse código:
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=campominado_db
DB_USER=postgres
DB_PASSWORD=postgres
# Server Configuration
PORT=3000
NODE_ENV=development

A API estará disponível em:
http://localhost:3000

Instale as dependências:
npm install

Ligue o banco:
sudo service postgresql start 

Verifique se o status está como online:
sudo service postgresql status

Rode o programa:
npm run dev


## Endpoints

### Cadastro de usuário
POST /auth/register
### Login
POST /auth/login
### Resetar a senha de usuário
POST auth/reset-password
### Buscar usúario por ID
GET /users/:id
### Dashboard usuário
GET /users/:id/dashboard
### Atualizar saldo do usuário
PUT /users/:id
### Deletar usuário
DELETE /users/:id
### Iniciar jogo
POST /games/start
### Revelar posição
POST /games/{gameId}/reveal
### Sacar prêmio
POST /games/{gameId}/cashout
