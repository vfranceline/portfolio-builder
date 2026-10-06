# Portfolio Builder

SaaS para criação de portfólios profissionais dinâmicos para desenvolvedores, designers e profissionais de tecnologia.

O projeto permitirá criar, personalizar e publicar portfólios profissionais com suporte a múltiplos idiomas, temas, projetos, experiências, habilidades e métricas de acesso.

## Status

Em desenvolvimento.

### Semana 1 — concluída

* [x] Estrutura inicial do projeto
* [x] PostgreSQL com Docker
* [x] Configuração de ambiente
* [x] Schema Prisma
* [x] Migration inicial
* [x] Prisma Client
* [x] Arquitetura base da API
* [x] Endpoint de health check
* [x] Seed do banco de dados

---

## Stack

### Backend

* Node.js
* TypeScript
* Express
* Prisma ORM
* PostgreSQL

### Desenvolvimento

* Docker
* Git
* GitHub

### Arquitetura

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Prisma
  ↓
PostgreSQL
```

---

## Estrutura do Backend

```text
backend/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   └── env.ts
│   │
│   ├── controllers/
│   │   └── health.controller.ts
│   │
│   ├── routes/
│   │   ├── health.routes.ts
│   │   └── index.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env.example
├── package.json
├── prisma7.config.ts
└── tsconfig.json
```

---

## Pré-requisitos

* Node.js
* npm
* Docker
* Docker Compose

---

## Configuração

Clone o repositório:

```bash
git clone <REPOSITORY_URL>
cd portfolio-builder
```

Entre no backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Configure as variáveis de ambiente:

```env
DATABASE_URL="postgresql://portfolio:portfolio@localhost:5432/portfolio"
PORT=3000
```

> O arquivo `.env` não deve ser versionado.

---

## PostgreSQL

O PostgreSQL é executado através do Docker.

Na raiz do projeto:

```bash
docker compose up -d
```

Para verificar os containers:

```bash
docker ps
```

Para interromper os serviços:

```bash
docker compose down
```

---

## Prisma

O projeto utiliza Prisma como ORM para acesso ao PostgreSQL.

### Gerar o Prisma Client

```bash
npx prisma generate
```

### Verificar o estado das migrations

```bash
npx prisma migrate status
```

### Criar uma migration

Durante o desenvolvimento:

```bash
npx prisma migrate dev --name <migration-name>
```

### Abrir o Prisma Studio

```bash
npx prisma studio
```

O Prisma Studio permite visualizar e manipular os dados do banco durante o desenvolvimento.

---

## Seed

O projeto possui um seed para criar dados iniciais de demonstração.

Execute:

```bash
npm run seed
```

O seed cria:

* 3 temas;
* 1 usuário de demonstração;
* 1 portfólio;
* traduções em português e inglês;
* seções do portfólio;
* links sociais;
* habilidades;
* projeto de demonstração;
* traduções do projeto.

O seed pode ser executado novamente sem criar registros duplicados nos dados que utilizam identificadores únicos.

---

## Executar a API

Modo de desenvolvimento:

```bash
npm run dev
```

A API ficará disponível na porta configurada no `.env`.

Por padrão:

```text
http://localhost:3000
```

---

## Health Check

A API possui um endpoint para verificar se o servidor está funcionando:

```http
GET /api/health
```

Exemplo:

```bash
curl http://localhost:3000/api/health
```

Resposta esperada:

```json
{
  "status": "ok",
  "service": "portfolio-builder-api"
}
```

---

## Próximas etapas

O desenvolvimento seguirá aproximadamente esta ordem:

1. Autenticação e segurança
2. Frontend
3. Editor de portfólio
4. Publicação e temas
5. Infraestrutura e deploy
6. Uploads, internacionalização e analytics

Funcionalidades como login, JWT, editor visual, página pública e infraestrutura AWS ainda não fazem parte da implementação da Semana 1.
