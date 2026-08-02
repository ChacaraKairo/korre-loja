# Checklist de implementação — Loja do Korre

## Preparação

- [ ] Confirmar nome final do projeto.
- [ ] Confirmar domínio ou subdomínio.
- [ ] Confirmar identidade visual.
- [ ] Confirmar categorias iniciais.
- [ ] Confirmar aviso público de links afiliados.

## Monorepo

- [ ] Criar `apps/web-store`.
- [ ] Criar `apps/api`.
- [ ] Criar `apps/admin-desktop`.
- [ ] Criar `packages/shared`.
- [ ] Configurar TypeScript.
- [ ] Configurar scripts de desenvolvimento.

## Backend

- [ ] Criar API NestJS.
- [ ] Configurar PostgreSQL.
- [ ] Configurar Prisma.
- [ ] Criar autenticação administrativa.
- [ ] Criar CRUD de categorias.
- [ ] Criar CRUD de produtos.
- [ ] Criar cadastro de links afiliados.
- [ ] Criar registro de cliques.
- [ ] Criar relatórios básicos.
- [ ] Criar logs administrativos.

## Site público

- [ ] Criar home da loja.
- [ ] Criar listagem de categorias.
- [ ] Criar listagem de produtos.
- [ ] Criar card de produto.
- [ ] Criar busca e filtros.
- [ ] Criar aviso de afiliado.
- [ ] Integrar com backend.
- [ ] Redirecionar para Mercado Livre após registrar clique.

## Admin desktop

- [ ] Criar app Electron.
- [ ] Criar login.
- [ ] Criar dashboard.
- [ ] Criar tela de produtos.
- [ ] Criar tela de categorias.
- [ ] Criar tela de cliques.
- [ ] Criar tela de relatórios.
- [ ] Criar configurações da API.

## Analytics

- [ ] Registrar cliques por produto.
- [ ] Registrar cliques por categoria.
- [ ] Registrar cliques por campanha.
- [ ] Mostrar produtos mais clicados.
- [ ] Mostrar categorias mais clicadas.
- [ ] Mostrar cliques por período.

## Segurança

- [ ] Usar hash para senha admin.
- [ ] Proteger rotas admin com JWT.
- [ ] Configurar CORS.
- [ ] Configurar rate limit.
- [ ] Usar variáveis de ambiente.
- [ ] Não coletar dados pessoais desnecessários.

## Deploy

- [ ] Criar `.env.example`.
- [ ] Criar Docker Compose local.
- [ ] Preparar deploy da API.
- [ ] Preparar deploy do site.
- [ ] Preparar banco gerenciado.
- [ ] Configurar HTTPS.

## Validação final

- [ ] Produto cadastrado aparece no site.
- [ ] Produto inativo não aparece no site.
- [ ] Clique é registrado no backend.
- [ ] Usuário é redirecionado corretamente.
- [ ] Admin mostra produtos mais clicados.
- [ ] Relatórios carregam corretamente.
- [ ] Build do site passa.
- [ ] Build da API passa.
- [ ] Build do Electron passa.
