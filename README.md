# Portfolio Builder

Plataforma SaaS para criação dinâmica de portfólios profissionais.

## Stack

- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma
- Docker

## Arquitetura

API REST organizada em:

Route
→ Controller
→ Service
→ Prisma
→ PostgreSQL

## Desenvolvimento

### Subir PostgreSQL

docker compose up -d

### Instalar dependências

cd backend
npm install

### Executar migrations

npx prisma migrate dev

### Rodar API

npm run dev