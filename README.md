# Desafio Artia
O desafio consiste em criar um gerenciador de projetos e atividades, permitindo que o usuário acompanhe o progresso e vencimentos/prazo das atividades e projetos.

Estrutura do Projeto:
API: desenvolvido com Node, Express e PrismaORM.
Front: desenvolvido com React.
BD: PostgreSQL

# Como executar a aplicação:
1. Utilizando Docker:
Basta executar o seguinte comando: "docker compose up -d --build"
Após a conclusão do build e a subida dos containers, acesse a aplicação em http://localhost:5173 no seu navegador.

2. Manualmente:
API
- Acesse a pasta "back"
- Instale as dependências: "npm install"
- Crie um arquivo .env a partir do template: cp .env.example .env
- Execute a api: "npm run dev"
FRONT
- Acesse a pasta "front"
- Instale as dependências: "npm install"
- Execute o front: "npm run dev"
BD:
- Na raiz do projeto, execute: "docker compose up postgres -d"

