# Admin Desktop — KORRE Loja

## Objetivo

O Admin Desktop será o aplicativo interno para gerenciar a KORRE Loja.

Ele deve consumir o backend e permitir que a equipe cadastre produtos, edite links afiliados, veja cliques e acompanhe os produtos com melhor desempenho.

## Stack sugerida

- Electron.
- React.
- Vite.
- TypeScript.
- TanStack Query ou Zustand.
- CSS/Tailwind.

## Telas principais

### Login

- e-mail;
- senha;
- feedback de erro;
- proteção contra tentativas repetidas.

### Dashboard

Indicadores:

- total de produtos ativos;
- total de categorias;
- cliques hoje;
- cliques últimos 7 dias;
- produto mais clicado;
- categoria mais clicada;
- campanhas ativas;
- produtos sem link válido.

### Produtos

Funções:

- listar produtos;
- buscar por nome;
- filtrar por categoria;
- filtrar por status;
- criar produto;
- editar produto;
- ativar/inativar;
- ver cliques do produto;
- marcar como destaque.

### Categorias

Funções:

- criar categoria;
- editar nome, slug e descrição;
- definir ordem;
- ativar/inativar.

### Campanhas

Funções:

- criar campanha;
- associar produtos;
- definir período;
- definir origem;
- analisar cliques.

### Cliques

Visualizar:

- data/hora;
- produto;
- categoria;
- origem;
- campanha;
- navegador resumido;
- referer;
- UTM.

### Relatórios

Relatórios iniciais:

- produtos mais clicados;
- categorias mais clicadas;
- cliques por dia;
- cliques por campanha;
- produtos sem cliques;
- produtos com link inválido;
- evolução semanal.

### Configurações

- URL da API;
- dados da loja;
- aviso de afiliado;
- parâmetros padrão de UTM;
- usuário admin.

## Segurança Electron

Obrigatório:

- `contextIsolation: true`;
- `nodeIntegration: false` no renderer;
- preload seguro;
- não expor APIs do Node diretamente;
- salvar token com cuidado;
- permitir logout;
- nunca armazenar senha em texto puro.

## UX esperada

O admin deve ser simples, funcional e direto.

Prioridades:

- cadastrar produto rápido;
- editar link afiliado sem confusão;
- ver métricas sem abrir planilha;
- identificar produtos mais clicados;
- detectar links quebrados;
- publicar/inativar produtos com segurança.

## MVP do admin

MVP mínimo:

- login;
- dashboard;
- CRUD de produtos;
- CRUD de categorias;
- registro/listagem de cliques;
- relatório de produtos mais clicados;
- configuração da URL da API.
