# Índice geral — KORRE Loja

## Documentos principais

1. [Visão geral](01-visao-geral.md)
2. [Arquitetura geral](02-arquitetura-geral.md)
3. [Site ecommerce](03-site-ecommerce.md)
4. [Backend](04-backend.md)
5. [Admin desktop](05-admin-desktop.md)
6. [Mercado Livre e afiliados](06-mercado-livre-afiliados.md)
7. [Métricas e analytics](07-metricas-e-analytics.md)
8. [Modelo de banco de dados](08-modelo-banco-de-dados.md)
9. [Roadmap](09-roadmap.md)
10. [Checklist de implementação](10-checklist-implementacao.md)
11. [Inventário de imagens](images/README-imagens.txt)

## Documentos estratégicos baseados nos estudos enviados

12. [Mercado, benchmarks e posicionamento](11-mercado-benchmarks-e-posicionamento.md)
13. [Taxonomia, UX e conversão](12-taxonomia-ux-e-conversao.md)
14. [SEO, conteúdo e comunidade](13-seo-conteudo-e-comunidade.md)
15. [Conformidade: afiliados, LGPD, cookies e publicidade](14-conformidade-afiliados-lgpd-conar.md)
16. [Economia unitária, KPIs e ranking editorial](15-economia-unitaria-kpis-e-ranking.md)
17. [PRD do MVP](16-prd-mvp-korre-loja.md)
18. [Backend e Admin: dados, métricas e gestão](17-backend-admin-dados-e-gestao.md)

## Visão de alto nível

A KORRE Loja será um ecommerce afiliado para motoristas e entregadores, integrado ao ecossistema KORRE, mas independente do app principal.

A plataforma terá três partes:

- **Site público**: vitrine de produtos, guias, comparativos e redirecionamento para links de marketplaces parceiros.
- **Backend**: cadastro de produtos, ofertas, links, categorias, tracking de cliques, campanhas, métricas e auditoria.
- **Admin desktop**: gestão interna de produtos, cliques, campanhas, relatórios, rankings e revisões de conformidade.

## Princípios do projeto

- Não vender produto próprio no MVP.
- Não processar pagamento próprio no MVP.
- Não simular checkout dentro da KORRE Loja.
- Não coletar dados pessoais desnecessários.
- Registrar cliques e métricas de forma responsável.
- Separar métricas anônimas de dados pessoais.
- Usar links oficiais de afiliados.
- Priorizar curadoria, compatibilidade, confiança e velocidade de decisão.
- Organizar a loja por veículo, rotina e problema real.
- Priorizar produtos úteis, seguros e adequados para motoristas e entregadores.
- Exibir aviso de afiliado de forma clara.
- Não ordenar produtos apenas por comissão.

## Decisão de produto

O MVP da KORRE Loja será **affiliate-first**.

Fluxo principal:

```txt
Usuário acessa o site
↓
Escolhe veículo ou problema
↓
Vê produtos e guias curados
↓
Clica para conferir preço no marketplace
↓
Backend registra clique
↓
Compra, pagamento, frete e pós-venda acontecem no marketplace parceiro
```

A evolução para estoque próprio, fulfillment, clube de benefícios ou marketplace híbrido só deve acontecer depois que os dados comprovarem demanda recorrente, baixa devolução, margem suficiente e necessidade real de controle de entrega.
