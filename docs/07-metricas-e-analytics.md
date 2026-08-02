# Métricas e analytics — Loja do Korre

## Objetivo

A Loja do Korre precisa medir quais produtos recebem mais atenção do público, sem coletar dados pessoais desnecessários.

O foco inicial é entender:

- quais produtos são mais clicados;
- quais categorias performam melhor;
- quais campanhas geram mais cliques;
- quais origens trazem tráfego;
- quais produtos não recebem interesse.

## Métrica principal

### Clique de produto

Evento registrado quando o usuário clica para ir ao Mercado Livre.

Campos:

- id do produto;
- id da categoria;
- id da campanha, se houver;
- origem;
- UTM source;
- UTM medium;
- UTM campaign;
- referer;
- user agent resumido;
- data/hora;
- IP anonimizado ou hash, se for necessário para segurança/rate limit.

## Métricas do dashboard

### Indicadores principais

- Cliques hoje.
- Cliques nos últimos 7 dias.
- Cliques nos últimos 30 dias.
- Produtos ativos.
- Produto mais clicado.
- Categoria mais clicada.
- Campanha mais clicada.
- Produtos sem clique.

### Relatórios

- Top 10 produtos por clique.
- Top categorias.
- Cliques por dia.
- Cliques por origem.
- Cliques por campanha.
- Evolução mensal.

## Privacidade

No MVP, evitar contas de usuários e evitar rastreamento pessoal.

Regras:

- não criar perfil de comprador;
- não coletar nome;
- não coletar CPF;
- não coletar e-mail do visitante;
- não coletar telefone;
- não coletar localização precisa;
- não coletar dados de pagamento;
- não coletar dados de pedido do Mercado Livre.

## Dados técnicos permitidos

Apenas se necessário para segurança, estatística ou depuração:

- user agent resumido;
- referer;
- origem UTM;
- data/hora;
- rota acessada;
- produto clicado;
- categoria;
- campanha.

## Cuidados com IP

Se registrar IP para rate limit ou segurança, preferir:

- anonimizar;
- truncar;
- fazer hash;
- manter por período curto;
- não exibir no painel por padrão.

## Evento de clique sugerido

```json
{
  "productId": "uuid",
  "categoryId": "uuid",
  "campaignId": "uuid opcional",
  "source": "site",
  "utmSource": "korre-site",
  "utmMedium": "organic",
  "utmCampaign": "home-destaques",
  "referrer": "https://korre-app.netlify.app",
  "createdAt": "2026-08-01T20:00:00.000Z"
}
```

## Regra de redirecionamento

Fluxo ideal:

1. Site chama `POST /public/clicks`.
2. Backend registra evento.
3. Backend responde com URL final validada.
4. Site redireciona o usuário.

Se o backend falhar:

- redirecionar mesmo assim para não prejudicar o usuário;
- registrar erro no console apenas em desenvolvimento;
- não travar a experiência.

## Relatórios futuros

Em versões futuras:

- taxa de clique por visualização;
- produtos mais clicados por horário;
- categorias por origem;
- comparação semanal;
- campanhas por canal;
- ranking de produtos recomendados pelo KORRE.
