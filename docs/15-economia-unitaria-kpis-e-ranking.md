# Economia unitária, KPIs e ranking editorial — Loja do Korre

## Objetivo

Definir como a Loja do Korre deve medir desempenho, avaliar produtos e ordenar recomendações sem destruir confiança editorial.

Em ecommerce afiliado, tráfego sozinho não prova sucesso. O que importa é a combinação entre intenção de compra, clique qualificado, conversão no parceiro, comissão aprovada e recorrência.

## Fórmula base de receita afiliada

```txt
Receita afiliada = sessões × CTR de saída × conversão no lojista × ticket médio × comissão × taxa de aprovação
```

Essa fórmula deve orientar o painel administrativo e as decisões de produto.

## KPIs principais

### Sessões

Quantidade de visitas no site ou página.

Uso:

- medir alcance;
- comparar canais;
- acompanhar SEO.

Limitação:

- sessão sem intenção de compra pode gerar pouca receita.

### CTR de saída

Percentual de usuários que clicam para o marketplace.

```txt
CTR de saída = cliques enviados ao lojista / sessões da página
```

Uso:

- medir força do CTA;
- medir clareza da página;
- comparar cards, categorias e guias.

### EPC

Earning per click: receita aprovada média por clique enviado.

```txt
EPC = comissão aprovada / cliques enviados ao lojista
```

Uso:

- avaliar qualidade real dos cliques;
- comparar marketplaces;
- estimar viabilidade de tráfego pago.

### RPM afiliado

Receita por mil sessões.

```txt
RPM afiliado = (comissão aprovada / sessões do site) × 1.000
```

Uso:

- comparar páginas;
- priorizar guias;
- medir monetização do SEO.

### Taxa de aprovação

```txt
Taxa de aprovação = pedidos aprovados / pedidos atribuídos
```

Uso:

- detectar reversões;
- avaliar qualidade de tráfego;
- entender cancelamentos, fraudes e devoluções.

### CPC máximo de equilíbrio

```txt
CPC máximo de equilíbrio = EPC × (1 - margem de segurança)
```

Uso:

- decidir se vale comprar tráfego;
- impedir campanhas pagas que queimem margem.

## KPIs do painel admin

O admin desktop deve mostrar:

- produtos mais clicados;
- produtos com melhor CTR;
- produtos com melhor EPC;
- categorias com maior saída;
- guias que mais geram cliques;
- cliques por marketplace;
- cliques por origem;
- cliques por campanha;
- produtos sem clique;
- produtos com clique alto e baixa comissão;
- produtos com potencial para destaque;
- produtos que precisam de revisão.

## Ranking editorial

A ordenação dos produtos não deve ser guiada apenas por comissão.

Fórmula recomendada:

```txt
Pontuação =
30% adequação ao uso
+ 20% qualidade e reputação
+ 15% preço total
+ 15% prazo
+ 10% garantia e devolução
+ 10% conversão histórica
```

A comissão pode ser usada como critério de desempate, mas não deve superar segurança, compatibilidade e valor para o trabalhador.

## Campos para ranking no banco

Produto:

- editorialScore;
- useFitScore;
- qualityScore;
- sellerReputationScore;
- totalPriceScore;
- deliveryScore;
- warrantyScore;
- historicalConversionScore;
- commissionWeight;
- finalRankingScore;
- rankingReason;
- lastRankingReviewAt.

## Critérios de adequação ao uso

Perguntas:

- resolve uma dor real?
- é adequado para carro, moto ou bicicleta?
- é útil para jornada longa?
- ajuda em chuva, calor, noite ou manutenção?
- reduz tempo parado?
- melhora segurança operacional?
- evita erro comum de compra?

## Critérios de qualidade e reputação

Perguntas:

- há avaliações suficientes?
- vendedor tem boa reputação?
- existem reclamações recorrentes?
- o material parece adequado?
- há certificação quando necessária?
- há fotos e especificações claras?

## Critérios de preço total

Considerar:

- preço do produto;
- frete;
- prazo;
- cupom;
- importação/tributação quando aplicável;
- custo-benefício para rotina de trabalho.

## Critérios de prazo

Produtos urgentes devem priorizar entrega rápida.

Exemplos:

- capa de chuva;
- carregador;
- suporte de celular;
- bag de entrega;
- luz de bicicleta;
- item de manutenção emergencial.

Produtos não urgentes podem aceitar prazo maior quando o preço compensar.

## Critérios de garantia e devolução

Avaliar:

- política do marketplace;
- garantia informada;
- facilidade de devolução;
- reputação do seller;
- clareza sobre pós-venda.

## Conversão histórica

Usar dados próprios para ajustar curadoria:

- produto muito clicado, mas baixa conversão: revisar promessa, preço ou compatibilidade;
- produto pouco clicado, mas alta conversão: melhorar exposição;
- guia com bom CTR: produzir variações;
- categoria com baixa saída: revisar intenção de busca.

## Métricas de clique

Cada clique deve registrar:

- productId;
- offerId;
- marketplace;
- categoryId;
- sourcePage;
- campaignId;
- referrer;
- deviceType;
- userAgent resumido ou hash, se necessário;
- timestamp;
- consentState;
- outboundUrlId.

Evitar coletar dados pessoais desnecessários.

## Métricas de campanha

Cada campanha deve medir:

- origem;
- canal;
- UTM;
- produto;
- categoria;
- cliques;
- CTR;
- EPC, se disponível;
- RPM afiliado;
- data de início e fim.

## Alertas do admin

Criar alertas para:

- produto com preço desatualizado;
- produto sem clique após X dias;
- produto com clique alto e baixa aprovação;
- categoria sem produtos suficientes;
- link quebrado;
- marketplace indisponível;
- produto de segurança sem certificação preenchida;
- oferta sem aviso de afiliado;
- campanha com desempenho ruim.

## Painel executivo

Indicadores para a tela inicial do admin:

- cliques hoje;
- cliques últimos 7 dias;
- produto mais clicado;
- categoria mais clicada;
- marketplace mais clicado;
- melhor página de guia;
- produtos pendentes de revisão;
- links com erro;
- evolução semanal.

## Decisão de migração para híbrido

Só considerar estoque próprio ou venda direta quando um produto demonstrar:

- procura recorrente;
- baixa devolução;
- margem suficiente;
- especificação estável;
- baixa complexidade de instalação;
- necessidade de entrega controlada;
- tráfego e conversão consistentes.

Até lá, manter modelo afiliado.
