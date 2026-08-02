# Visão geral — Loja do Korre

## O que é

A **Loja do Korre** é uma vitrine ecommerce afiliada, focada em produtos úteis para motoristas de aplicativo, motoboys, entregadores e profissionais autônomos que usam carro ou moto como ferramenta de trabalho.

O objetivo não é competir com o Mercado Livre, mas organizar uma curadoria de produtos relevantes para o público do KORRE e redirecionar o usuário para compra por meio de links de afiliado.

## Problema que resolve

Motoristas e entregadores precisam comprar acessórios e itens de rotina, mas normalmente procuram produtos espalhados, sem curadoria e sem foco real na rotina de trabalho.

A Loja do Korre organiza produtos por necessidade prática:

- segurança no uso do celular;
- carregamento durante o trabalho;
- manutenção preventiva;
- chuva e proteção;
- conforto na jornada;
- organização da moto/carro;
- entrega e transporte;
- ferramentas simples;
- economia e produtividade.

## Proposta de valor

A loja deve responder a uma pergunta simples:

> “O que um motorista ou entregador precisa comprar para trabalhar melhor, com mais organização e menos improviso?”

## Modelo de negócio

Modelo inicial:

- produtos exibidos no site da Loja do Korre;
- clique redireciona para o Mercado Livre;
- link pode conter identificação de afiliado;
- backend registra clique, produto, categoria, origem e data;
- admin mostra os produtos mais clicados e campanhas com melhor desempenho.

## O que a Loja do Korre não faz no MVP

- Não processa pagamento.
- Não emite nota fiscal de produto.
- Não gerencia estoque físico.
- Não faz entrega.
- Não cria checkout próprio.
- Não coleta cartão de crédito.
- Não vende diretamente produtos próprios.

## Módulos do produto

### Site público

- Página inicial da loja.
- Categorias.
- Lista de produtos.
- Página de produto/recomendação.
- Busca e filtros.
- Cards com preço, avaliação, destaque e botão de compra.
- Redirecionamento para Mercado Livre.

### Backend

- Cadastro de produtos.
- Cadastro de categorias.
- Cadastro de links afiliados.
- Controle de produtos ativos/inativos.
- Registro de cliques.
- Registro de campanhas.
- Relatórios.
- Autenticação administrativa.

### Admin desktop

- Login administrativo.
- Dashboard.
- Produtos.
- Categorias.
- Campanhas.
- Cliques.
- Mais clicados.
- Configurações.

## Relação com o KORRE principal

O app KORRE principal pode futuramente ter banners ou links para a Loja do Korre, por exemplo:

- “Produtos úteis para seu veículo”.
- “Itens recomendados para entregadores”.
- “Acessórios para trabalhar melhor”.

Mas a Loja do Korre deve continuar independente, para não misturar banco, deploy e regras de negócio do app principal.
