# Backend — Loja do Korre

## Objetivo

O backend será o núcleo administrativo e analítico da Loja do Korre.

Ele deve fornecer APIs para:

- site público;
- admin desktop;
- gestão de produtos;
- gestão de categorias;
- registro de cliques;
- relatórios;
- campanhas;
- autenticação administrativa.

## Stack recomendada

- NestJS.
- TypeScript.
- PostgreSQL.
- Prisma ORM.
- JWT.
- bcrypt ou argon2.
- Zod ou class-validator.
- Helmet.
- Rate limit.
- Docker Compose.
- Swagger/OpenAPI.

## Estrutura sugerida

```txt
apps/api/
  src/
    main.ts
    app.module.ts
    modules/
      auth/
      admin-users/
      products/
      categories/
      affiliate-links/
      clicks/
      campaigns/
      reports/
      audit-logs/
      health/
    common/
      guards/
      decorators/
      filters/
      interceptors/
      validators/
  prisma/
    schema.prisma
    migrations/
  test/
```

## Módulos

### Auth

- login admin;
- refresh token, se necessário;
- proteção de rotas;
- roles básicas.

### Products

- criar produto;
- editar produto;
- inativar produto;
- listar produtos;
- buscar produto público;
- marcar destaque;
- gerenciar preço de referência;
- gerenciar imagem;
- gerenciar tags.

### Categories

- criar categoria;
- editar categoria;
- ordenar categorias;
- ativar/inativar categoria;
- associar produtos.

### Affiliate Links

- armazenar link final do Mercado Livre;
- armazenar link original;
- registrar origem;
- validar formato básico;
- ativar/inativar link.

### Clicks

- registrar clique público;
- capturar produto, categoria e campanha;
- não coletar dados pessoais desnecessários;
- agregar métricas por dia, produto, categoria e origem.

### Campaigns

- criar campanhas;
- associar produtos;
- gerar UTMs;
- medir cliques por campanha.

### Reports

- produtos mais clicados;
- categorias mais clicadas;
- cliques por período;
- cliques por origem;
- campanhas com melhor desempenho;
- produtos sem clique.

### Audit Logs

Registrar ações administrativas:

- criação de produto;
- edição de produto;
- remoção/inativação;
- login admin;
- alteração de link;
- alteração de campanha.

## Endpoints públicos

```txt
GET /health
GET /public/products
GET /public/products/:slug
GET /public/categories
GET /public/categories/:slug/products
POST /public/clicks
```

## Endpoints admin

```txt
POST /auth/login
GET /auth/me

GET /admin/dashboard

GET /admin/products
POST /admin/products
GET /admin/products/:id
PATCH /admin/products/:id
DELETE /admin/products/:id

GET /admin/categories
POST /admin/categories
PATCH /admin/categories/:id
DELETE /admin/categories/:id

GET /admin/clicks
GET /admin/reports/top-products
GET /admin/reports/top-categories
GET /admin/reports/campaigns

GET /admin/audit-logs
```

## Regras de segurança

- JWT obrigatório para admin.
- Rate limit em login e registro de cliques.
- Não salvar senha em texto puro.
- Não logar tokens.
- Não expor dados internos em endpoints públicos.
- Não aceitar links suspeitos sem validação.
- Não executar scraping automático no MVP.
- Não processar pagamentos.

## Variáveis de ambiente

```env
DATABASE_URL="postgresql://user:password@localhost:5432/korre_loja"
JWT_SECRET="change-me"
PORT=3333
CORS_ORIGIN="http://localhost:5173"
ADMIN_SEED_EMAIL="admin@korre.local"
ADMIN_SEED_PASSWORD="change-me"
```

## Deploy

Backend recomendado em:

- Render;
- Railway;
- Fly.io;
- VPS/EC2.

Banco recomendado:

- Neon;
- Supabase;
- Render PostgreSQL;
- Railway PostgreSQL;
- AWS RDS.
