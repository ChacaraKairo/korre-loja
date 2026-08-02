# KORRE Loja

Ecommerce afiliado do ecossistema KORRE para recomendar produtos úteis a motoristas de aplicativo, entregadores e profissionais que trabalham com veículo no dia a dia.

A KORRE Loja não nasce como marketplace próprio. O primeiro modelo é uma vitrine curada de produtos do Mercado Livre por meio de links de afiliado, com gestão interna de cliques, categorias, destaques, campanhas e métricas.

## Objetivo do projeto

Criar uma plataforma composta por:

1. **Site público da loja**: vitrine de produtos, categorias, busca, filtros e redirecionamento para compra no Mercado Livre.
2. **Backend da loja**: API, banco de dados, rastreamento de cliques, gestão de produtos, categorias, campanhas e relatórios.
3. **Admin desktop**: app interno para gerenciar produtos, links afiliados, cliques, destaques, relatórios e configurações.
4. **Documentação técnica e de produto**: arquitetura, banco, endpoints, regras de negócio, roadmap e checklist de implementação.

## Público-alvo

- Motoristas de aplicativo.
- Motoboys.
- Entregadores.
- Profissionais autônomos que trabalham na rua.
- Usuários do KORRE que precisam comprar acessórios, itens de manutenção, organização, segurança operacional e produtividade.

## Escopo inicial do ecommerce

Produtos recomendados para o público do KORRE, como:

- suporte de celular;
- carregador veicular;
- cabo reforçado;
- mochila ou bag para entrega;
- capa de chuva;
- luvas;
- jaqueta impermeável;
- itens de organização do veículo;
- acessórios para moto/carro;
- itens de manutenção preventiva;
- ferramentas simples;
- câmeras, suportes e acessórios permitidos;
- produtos para conforto e rotina de trabalho.

> Observação: evitar categorias restritas, perigosas, ilegais, adultas ou incompatíveis com a política da plataforma e com a segurança do usuário.

## Documentação

Comece por:

- [Índice geral](docs/00-indice-geral.md)
- [Visão geral do produto](docs/01-visao-geral.md)
- [Arquitetura geral](docs/02-arquitetura-geral.md)
- [Site ecommerce](docs/03-site-ecommerce.md)
- [Backend](docs/04-backend.md)
- [Admin desktop](docs/05-admin-desktop.md)
- [Mercado Livre e afiliados](docs/06-mercado-livre-afiliados.md)
- [Métricas e analytics](docs/07-metricas-e-analytics.md)
- [Modelo de banco de dados](docs/08-modelo-banco-de-dados.md)
- [Roadmap](docs/09-roadmap.md)
- [Checklist de implementação](docs/10-checklist-implementacao.md)

## Decisão arquitetural inicial

A KORRE Loja deve ser separada do app KORRE principal.

O app KORRE pode futuramente apontar para a loja, mas a loja deve ter:

- repositório próprio;
- backend próprio;
- banco próprio;
- painel administrativo próprio;
- métricas próprias;
- identidade visual alinhada ao KORRE, mas com foco em ecommerce.

## Stack sugerida

### Site público

- React + Vite ou Next.js.
- TypeScript.
- CSS/Tailwind.
- Deploy em Vercel ou Netlify.

### Backend

- NestJS.
- TypeScript.
- PostgreSQL.
- Prisma ORM.
- JWT para admin.
- Rate limiting.
- Logs e auditoria.

### Admin desktop

- Electron.
- React + Vite.
- TypeScript.
- Reaproveitamento de componentes do admin web.

## Status

Implementação iniciada em monorepo TypeScript com:

- `apps/web-store`: site publico React + Vite.
- `apps/api`: API NestJS com Prisma preparado e catalogo seed inicial.
- `apps/admin-desktop`: admin interno Electron + React + Vite.
- `packages/shared`: tipos e helpers compartilhados.

A interface visual segue a paleta do site KORRE principal:

- fundo `#0a0a0a`;
- superficies `#111111`, `#161616` e `#202020`;
- verde primario `#00c853`;
- verde forte `#00e676`;
- texto branco e cinzas neutros para apoio.

## Como rodar localmente

```bash
npm install
npm run dev:api
npm run dev:web
```

Em outro terminal, para abrir o admin desktop:

```bash
npm run dev:desktop
```

URLs padrao:

- Site publico: `http://localhost:5173`
- API: `http://localhost:3333`
- Swagger da API: `http://localhost:3333/docs`

## Comandos uteis

```bash
npm run typecheck
npm run build
npm run prisma:generate
```

Copie `.env.example` para `.env` quando for ligar o PostgreSQL real.
