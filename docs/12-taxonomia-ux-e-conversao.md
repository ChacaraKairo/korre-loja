# Taxonomia, UX e conversão — KORRE Loja

## Objetivo

Definir como o site público da KORRE Loja deve organizar produtos, páginas, filtros e componentes para maximizar clareza, confiança e clique qualificado.

O usuário principal acessa pelo celular, em intervalos curtos de trabalho. A experiência precisa resolver rápido: qual produto serve, por que comprar, onde comprar e quais cuidados observar.

## Princípio de UX

A primeira pergunta do site não deve ser “qual departamento você quer?”.

A primeira pergunta deve ser:

> Qual veículo você usa?

Em seguida, a navegação deve levar o usuário para problemas práticos:

- chuva;
- calor;
- segurança;
- celular e navegação;
- energia;
- organização;
- manutenção;
- conforto;
- turno noturno;
- longa jornada.

## Arquitetura de informação recomendada

```txt
Início
├── Para carro
│   ├── Celular e navegação
│   ├── Organização e conforto
│   ├── Limpeza e conservação
│   ├── Energia e carregamento
│   ├── Segurança e câmeras
│   └── Manutenção rápida
├── Para moto
│   ├── Capacetes e proteção
│   ├── Chuva e frio
│   ├── Suportes e navegação
│   ├── Comunicação
│   ├── Bagagem e entrega
│   └── Manutenção
├── Para bicicleta
│   ├── Capacetes e visibilidade
│   ├── Luzes e energia
│   ├── Bolsas e mochilas
│   ├── Chuva e roupas
│   ├── Segurança e cadeados
│   └── Ferramentas e reparos
├── Kits por problema
│   ├── Kit chuva
│   ├── Kit turno noturno
│   ├── Kit celular e energia
│   ├── Kit conforto
│   └── Kit emergência
├── Ofertas verificadas
└── Guias e comparativos
```

## Home mobile-first

Estrutura recomendada:

```txt
[Logo] [Buscar produto ou problema] [Menu]

Seu veículo é sua ferramenta de trabalho.
Equipamentos para rodar com mais segurança,
conforto e menos tempo parado.

[Estou de carro] [Estou de moto] [Estou de bicicleta]

Mais procurados hoje
[Suportes] [Capas de chuva] [Carregadores]
[Capacetes] [Luzes] [Organizadores]

Kits por rotina
[Turno noturno] [Dias de chuva] [Longa jornada]

Comparativos independentes
[Card de guia] [Card de guia] [Card de guia]

Ofertas verificadas
Preço e disponibilidade conferidos em: [data/hora]

Como selecionamos produtos
[Critérios] [Política de afiliados] [Correções]
```

Copy sugerida:

> Seu veículo é sua ferramenta de trabalho. Compare equipamentos para rodar com mais segurança, manter o celular carregado e perder menos tempo com imprevistos.

CTA principal:

> Escolher meu veículo

## Página de categoria

Estrutura:

- H1 orientado a necessidade;
- introdução curta;
- filtros por atributos críticos;
- cards de produto;
- comparador;
- perguntas frequentes;
- guias relacionados;
- aviso de afiliado.

Exemplo:

> Suportes de celular para moto: compare fixação, diâmetro do guidão e proteção contra vibração.

## Página de produto afiliado

Estrutura recomendada:

```txt
[Trilha de navegação]
Suporte de celular X para moto

[Imagem principal]

Veredito
Melhor para: uso urbano diário
Evite se: guidão fora da medida suportada
A partir de R$ [preço de referência]
Atualizado em DD/MM às HH:mm

[Ver preço no Mercado Livre]
[Conferir na Amazon]
[Comparar na Shopee]

Link de afiliado. A compra ocorre na loja parceira.

Pontos fortes | Limitações
Compatibilidade
Ficha técnica
Alternativas
FAQ
Metodologia de análise
```

## Página de saída para parceiro

Antes de redirecionar, quando necessário, exibir:

- lojista de destino;
- aviso de preço/frete;
- CTA claro;
- alternativa caso produto esteja indisponível.

Copy sugerida:

> Você continuará a compra no Mercado Livre. Preço, entrega, pagamento e pós-venda serão definidos pela loja parceira.

## Cards de produto

Cada card deve exibir:

- imagem otimizada;
- selo funcional;
- nome claro;
- preço de referência;
- marketplace principal;
- nota editorial ou avaliação consolidada;
- melhor uso;
- alerta de compatibilidade quando necessário;
- CTA direto.

Selos úteis:

- Mais buscado por entregadores;
- Bom para chuva;
- Boa opção para moto;
- Bom custo-benefício;
- Exige atenção à medida;
- Conferir certificação;
- Atualizado hoje.

## Filtros táticos

### Carro

- tipo de uso: app/táxi/viagem;
- fixação;
- carregamento rápido;
- compatibilidade com painel;
- câmera interna/externa;
- conforto;
- limpeza.

### Moto

- guidão compatível;
- impermeável;
- antivibração;
- certificado;
- capacidade da bag;
- uso em chuva;
- uso noturno;
- proteção térmica.

### Bicicleta

- visibilidade;
- autonomia da luz;
- resistência à água;
- capacidade da mochila;
- segurança/cadeado;
- reparo rápido;
- compatibilidade com e-bike.

## Componentes de alta conversão

- busca preditiva;
- abas por veículo;
- filtros rápidos;
- comparador por perfil;
- tabela de prós e contras;
- aviso de afiliado visível;
- botão de compra externo claro;
- data de atualização;
- preço sujeito a alteração;
- ranking com metodologia;
- alternativas por orçamento.

## Regras de confiança

A classificação dos produtos deve considerar utilidade, segurança, preço total e reputação. Comissão pode ser critério de desempate, mas nunca deve dominar o ranking.

Texto de transparência recomendado:

> Alguns links desta página são de afiliados. Podemos receber comissão quando você compra, sem custo adicional para você. A classificação considera utilidade, segurança, preço total e reputação — não apenas comissão.

## O que evitar

- Página pesada no celular.
- Grid genérico de loja de departamentos.
- CTA que simula checkout próprio.
- Promessa de preço fixo sem atualização.
- Produto sem contexto de uso.
- Produto técnico sem compatibilidade.
- Conteúdo importante escondido só no desktop.

## Métrica de sucesso da UX

- CTR de saída qualificado;
- clique por categoria;
- tempo até primeiro clique;
- uso de filtros;
- taxa de retorno;
- produtos com clique mas baixa conversão;
- guias que geram cliques.
