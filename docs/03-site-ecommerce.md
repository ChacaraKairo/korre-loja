# Site ecommerce — KORRE Loja

## Objetivo

O site ecommerce será a vitrine pública da KORRE Loja.

Ele deve apresentar produtos úteis para motoristas, entregadores e profissionais que usam veículo para trabalho, com redirecionamento para compra no Mercado Livre por link de afiliado.

## Telas principais

### 1. Home da loja

Conteúdo:

- hero da loja;
- categorias principais;
- produtos em destaque;
- produtos mais clicados;
- produtos recomendados para motoristas de app;
- aviso de links afiliados;
- CTA para conhecer o app KORRE.

### 2. Categorias

Categorias iniciais sugeridas:

- celular e suporte;
- carregadores e cabos;
- acessórios para moto;
- acessórios para carro;
- entrega e bag;
- chuva e proteção;
- manutenção;
- ferramentas;
- organização;
- conforto na rotina.

### 3. Lista de produtos

Cada card deve exibir:

- imagem;
- nome curto;
- categoria;
- preço de referência, se cadastrado;
- selo de destaque, se houver;
- motivo da recomendação;
- botão “Ver no Mercado Livre”.

### 4. Detalhe/recomendação de produto

Não precisa ser uma página de produto completa no MVP, mas pode existir para SEO.

Conteúdo:

- imagem maior;
- descrição da recomendação;
- para quem serve;
- cuidados antes de comprar;
- botão para Mercado Livre;
- produtos relacionados.

## UX desejada

A loja deve parecer uma curadoria prática, não uma lista aleatória de produtos.

Cada produto deve responder:

- por que isso é útil para motorista/entregador?
- em que situação usar?
- quais cuidados observar antes de comprar?
- esse produto é para carro, moto ou ambos?

## Aviso de afiliado

O site deve informar de forma transparente:

> Alguns links da KORRE Loja podem ser links de afiliado. Isso significa que podemos receber uma comissão se você comprar pelo link, sem custo extra para você.

## Tracking de clique

Antes de redirecionar para o Mercado Livre, o site deve chamar o backend:

```txt
POST /public/clicks
```

O backend registra:

- produto;
- categoria;
- origem;
- campanha;
- data/hora;
- user agent resumido;
- referer;
- utm_source;
- utm_medium;
- utm_campaign.

Depois o usuário é redirecionado para o link afiliado.

## Estados do site

### Produto sem link

Não exibir botão de compra. Mostrar:

> Produto temporariamente indisponível.

### Produto inativo

Não listar publicamente.

### Erro na API

Mostrar mensagem amigável:

> Não foi possível carregar os produtos agora. Tente novamente em alguns instantes.

## SEO

Preparar:

- título por categoria;
- descrição por categoria;
- Open Graph;
- imagem social;
- URLs amigáveis;
- sitemap futuro.

## Acessibilidade

- Botões com texto claro.
- Imagens com alt.
- Contraste adequado.
- Navegação por teclado.
- Não depender apenas de cor para destacar oferta.
