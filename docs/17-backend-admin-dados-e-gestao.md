# Backend e Admin: dados, métricas e gestão — Loja do Korre

## Objetivo

Definir quais dados o backend da Loja do Korre deve armazenar e quais informações o app desktop de gestão deve apresentar para permitir uma operação bem controlada do ecommerce afiliado.

Este documento foca apenas em:

- backend;
- banco de dados;
- app desktop/admin;
- eventos e métricas;
- dashboards;
- gestão operacional;
- saúde do catálogo;
- ranking editorial;
- relatórios.

Não cobre implementação visual do site público, checkout próprio ou venda direta.

## Contexto do modelo de negócio

A Loja do Korre começa como uma operação **affiliate-first**.

Isso significa:

- a Loja do Korre não processa pagamento no MVP;
- a Loja do Korre não controla frete, entrega ou pós-venda;
- a compra final acontece no marketplace parceiro;
- o botão principal deve levar o usuário para Mercado Livre, Amazon, Shopee ou outro parceiro;
- o dado principal da Loja do Korre não é venda, mas sim **intenção de compra medida por cliques qualificados**.

Como as vendas finais podem não estar disponíveis no detalhe por produto, a gestão precisa ser baseada em:

- impressões de produto;
- cliques de saída;
- CTR;
- origem do tráfego;
- buscas internas;
- campanhas;
- qualidade editorial;
- conformidade;
- saúde dos links;
- importações manuais de relatórios dos programas afiliados.

## Princípio de gestão

> Se não conseguimos ver toda venda final, precisamos medir intenção de compra melhor que uma loja genérica.

A Loja do Korre deve medir:

```txt
Produto exibido
↓
Produto clicado
↓
Oferta clicada
↓
Marketplace escolhido
↓
Origem do tráfego
↓
Campanha responsável
↓
Qualidade editorial do produto
↓
Saúde do link e da oferta
```

## Dados principais que devem existir

### 1. Produtos

Produtos representam a curadoria da Loja do Korre.

Campos recomendados:

```txt
id
nome
slug
descricao_curta
descricao_longa
categoria_principal_id
subcategoria_id
tipo_veiculo: carro | moto | bicicleta | todos
publico: motorista_app | entregador | motoboy | ciclista | geral
problema_resolvido: chuva | energia | seguranca | navegacao | conforto | manutencao | organizacao | outro
nivel_prioridade: alta | media | baixa
status: rascunho | ativo | pausado | removido
destaque: boolean
motivo_recomendacao
cuidados_antes_de_comprar
observacoes_internas
imagem_principal_url
imagem_fallback_url
criado_em
atualizado_em
```

Exemplo:

```txt
Produto: Suporte de celular antivibração para moto
Veículo: moto
Problema: navegação e proteção do celular
Público: motoboy / entregador
Motivo: ajuda a usar GPS sem segurar o celular e reduz vibração no aparelho
Cuidado: confirmar diâmetro do guidão e compatibilidade com o celular
```

### 2. Categorias e taxonomia

A taxonomia deve ser orientada por veículo, rotina e problema.

Categorias principais:

```txt
Para carro
Para moto
Para bicicleta
Kits por problema
Ofertas verificadas
Guias e comparativos
```

Subcategorias sugeridas:

```txt
Celular e navegação
Energia e carregamento
Chuva e frio
Segurança e câmeras
Organização e conforto
Manutenção rápida
Capacetes e proteção
Bagagem e entrega
Luzes e visibilidade
Ferramentas e reparos
```

Campos recomendados:

```txt
id
nome
slug
descricao
tipo_veiculo
problema_resolvido
categoria_pai_id
ordem
status
icone
imagem
seo_title
seo_description
criado_em
atualizado_em
```

### 3. Marketplaces

Representam os parceiros de destino.

Campos recomendados:

```txt
id
nome
slug
site_url
programa_afiliado_nome
status: ativo | pausado | indisponivel
observacoes
criado_em
atualizado_em
```

Exemplos:

```txt
Mercado Livre
Amazon Brasil
Shopee
Magalu
AliExpress
Temu
```

### 4. Ofertas e links afiliados

Um produto pode ter uma ou várias ofertas.

Campos recomendados:

```txt
id
produto_id
marketplace_id
url_original
url_afiliada
url_curta_interna
preco_referencia
preco_promocional
moeda
frete_estimado
prazo_estimado
seller_nome
seller_reputacao
seller_url
quantidade_avaliacoes
nota_media
possui_cupom
status: ativa | pausada | quebrada | expirada | revisar
origem_do_link: manual | importado | api | campanha
sub_id_afiliado
ultima_verificacao_em
observacoes_internas
criado_em
atualizado_em
```

Regra importante:

> O preço exibido no site deve ser tratado como referência, porque o valor final pode mudar no marketplace parceiro.

Texto operacional sugerido:

```txt
Preço sujeito a alteração no marketplace. Confira o valor final antes da compra.
```

## Eventos operacionais

### 1. Impressões de produto

Impressão é quando um produto aparece para o usuário.

Sem impressão, não há como calcular CTR real.

Campos recomendados:

```txt
id
produto_id
oferta_id opcional
pagina
pagina_tipo: home | categoria | produto | guia | comparativo | kit | busca
posicao_card
session_id_anonimo
visitor_id_anonimo opcional
origem
utm_source
utm_medium
utm_campaign
utm_content
utm_term
dispositivo_tipo
sistema_operacional
navegador
criado_em
```

Métrica derivada:

```txt
CTR do produto = cliques / impressões
```

### 2. Cliques de saída

Clique de saída é o principal evento do negócio.

Campos recomendados:

```txt
id
click_public_id
produto_id
oferta_id
categoria_id
marketplace_id
url_destino
pagina_origem
pagina_tipo: home | categoria | produto | guia | comparativo | kit | busca
posicao_card
texto_botao
origem
utm_source
utm_medium
utm_campaign
utm_content
utm_term
dispositivo_tipo
sistema_operacional
navegador
pais
estado_aproximado opcional
cidade_aproximada opcional
session_id_anonimo
visitor_id_anonimo opcional
ip_hash
user_agent_hash
foi_redirecionado
tempo_redirecionamento_ms
erro_redirecionamento
criado_em
```

Regras:

- não salvar IP puro sem necessidade;
- preferir hash de IP e user-agent;
- não coletar dados pessoais do visitante para clique simples;
- registrar erro de redirecionamento quando o link falhar;
- manter rastreabilidade por campanha e origem.

### 3. Buscas internas

Busca interna revela intenção real do público.

Campos recomendados:

```txt
id
termo_buscado
termo_normalizado
quantidade_resultados
clicou_em_algum_produto
produto_clicado_id opcional
categoria_sugerida_id opcional
session_id_anonimo
visitor_id_anonimo opcional
origem
dispositivo_tipo
criado_em
```

Relatórios importantes:

```txt
buscas mais feitas
buscas sem resultado
buscas com clique
buscas sem clique
termos que precisam virar categoria
termos que indicam demanda por novo produto
```

### 4. Campanhas

Toda divulgação deve ser rastreável.

Campos recomendados:

```txt
id
nome
slug
descricao
canal: whatsapp | telegram | instagram | tiktok | youtube | google | organic | direct | outro
utm_source
utm_medium
utm_campaign
data_inicio
data_fim
status: planejada | ativa | pausada | encerrada
objetivo
observacoes
criado_em
atualizado_em
```

Métricas de campanha:

```txt
cliques totais
cliques por produto
cliques por marketplace
cliques por origem
horario de pico
produto mais clicado
CTR por link
```

### 5. Publicações em comunidades

Se houver WhatsApp ou Telegram, cada publicação deve ser tratada como campanha ou ação rastreável.

Campos recomendados:

```txt
id
canal: whatsapp | telegram
nome_grupo_ou_canal
titulo_publicacao
mensagem
produto_id opcional
oferta_id opcional
campanha_id opcional
link_curto
data_hora_envio
cliques_gerados
primeiro_clique_em
ultimo_clique_em
observacoes
```

## Conteúdos, guias e comparativos

Guias podem gerar cliques mais qualificados do que páginas genéricas.

Campos recomendados:

```txt
id
titulo
slug
tipo: guia | comparativo | review | lista | kit
categoria_id
veiculo: carro | moto | bicicleta | todos
problema_resolvido
status: rascunho | publicado | pausado | arquivado
autor
publicado_em
atualizado_em
seo_title
seo_description
observacoes_internas
```

Relacionamento com produtos:

```txt
content_product_relations
id
content_page_id
produto_id
ordem
motivo_inclusao
```

Métricas úteis:

```txt
views do guia
cliques gerados
CTR de saída
produto mais clicado no guia
buscas que levaram ao guia
```

## Qualidade editorial e ranking

A Loja do Korre não deve ordenar produtos apenas por comissão.

O ranking editorial deve preservar confiança.

Campos recomendados:

```txt
id
produto_id
adequacao_ao_uso: 0 a 10
qualidade_reputacao: 0 a 10
preco_total: 0 a 10
prazo_entrega: 0 a 10
garantia_devolucao: 0 a 10
conversao_historica: 0 a 10
seguranca: 0 a 10
compatibilidade: 0 a 10
nota_editorial_final
revisor
revisado_em
observacoes
```

Fórmula base sugerida:

```txt
Pontuação editorial =
30% adequação ao uso
+ 20% qualidade e reputação
+ 15% preço total
+ 15% prazo
+ 10% garantia/devolução
+ 10% desempenho histórico
```

Regras:

- comissão pode ser critério de desempate;
- comissão não deve superar segurança, compatibilidade e utilidade real;
- produto com risco alto deve exigir revisão manual;
- produto sem motivo de recomendação não deve ir para destaque.

## Conformidade e segurança do catálogo

Alguns produtos exigem cuidado extra.

Exemplos:

```txt
capacetes
carregadores
eletronicos
iluminacao
cameras
suportes de moto
itens de seguranca
```

Campos recomendados:

```txt
id
produto_id
exige_certificacao
certificacao_tipo: inmetro | anatel | outro | nao_aplicavel
certificacao_informada
certificacao_verificada
fonte_verificacao
risco_produto: baixo | medio | alto
status_conformidade: ok | revisar | bloquear
alerta_usuario
revisor
revisado_em
```

Regras:

- não afirmar homologação sem comprovação;
- não afirmar resistência/impermeabilidade sem fonte confiável;
- capacetes devem exigir verificação editorial de certificação aplicável;
- itens de segurança sem informação clara devem ficar em revisão;
- produtos bloqueados não aparecem no site.

## Saúde do catálogo

O admin precisa indicar quando o catálogo está ficando velho, fraco ou inseguro.

Alertas recomendados:

```txt
produto sem clique nos últimos 30 dias
produto com muitas impressões e poucos cliques
produto com link quebrado
produto sem preço atualizado
produto sem imagem
produto sem motivo de recomendação
produto sem categoria
produto sem oferta ativa
produto de segurança sem certificação verificada
produto duplicado
produto pausado há muito tempo
categoria sem produtos ativos
```

Campos para verificações de link:

```txt
id
oferta_id
status_http
url_final
redirecionou_corretamente
tempo_resposta_ms
erro
verificado_em
```

## Importação manual de relatórios afiliados

Mesmo sem amarrar venda por produto, o admin deve permitir importar dados agregados do painel afiliado.

Campos recomendados:

```txt
id
marketplace_id
periodo_inicio
periodo_fim
cliques_reportados
pedidos_reportados opcional
comissao_aprovada
comissao_pendente
comissao_cancelada
moeda
arquivo_origem
observacoes
importado_por_admin_id
importado_em
```

Uso:

```txt
nossos cliques enviados por marketplace
vs
comissão total aprovada no painel afiliado
```

Isso permite estimar EPC por marketplace e por período.

## Métricas derivadas

### CTR de saída

```txt
CTR de saída = cliques de saída / impressões
```

### EPC estimado

```txt
EPC estimado = comissão aprovada importada / cliques enviados ao marketplace
```

### RPM afiliado estimado

```txt
RPM afiliado = (comissão aprovada / sessões) × 1.000
```

### Receita estimada

```txt
Receita estimada = cliques × EPC estimado
```

### CPC máximo de equilíbrio

```txt
CPC máximo de equilíbrio = EPC estimado × (1 - margem de segurança)
```

## Dashboards do app desktop

### Dashboard geral

Deve mostrar:

```txt
cliques hoje
cliques nos últimos 7 dias
cliques nos últimos 30 dias
produtos mais clicados
categorias mais clicadas
marketplaces mais clicados
origens com mais clique
produtos sem clique
links quebrados
produtos pendentes de revisão
produtos bloqueados por conformidade
```

### Dashboard de produto

Deve mostrar:

```txt
impressões
cliques
CTR
posição média na vitrine
origem dos cliques
marketplace mais clicado
histórico por dia
última verificação do link
nota editorial
status de conformidade
status de saúde do produto
```

### Dashboard de categoria

Deve mostrar:

```txt
produtos ativos
impressões
cliques
CTR médio
produto campeão
produto fraco
origens principais
buscas relacionadas
categorias sem produto
```

### Dashboard de campanha

Deve mostrar:

```txt
cliques totais
cliques por canal
produtos clicados
horário de pico
CTR por link
cliques por dia
marketplace mais acionado
```

### Dashboard de busca

Deve mostrar:

```txt
termos mais buscados
termos sem resultado
termos com maior clique
categorias buscadas
produtos encontrados
produtos faltantes sugeridos
```

### Dashboard de saúde do catálogo

Deve mostrar:

```txt
links quebrados
ofertas expiradas
produtos sem imagem
produtos sem preço de referência
produtos sem motivo de recomendação
produtos sem oferta ativa
produtos duplicados
produtos de segurança em revisão
produtos sem clique há 30 dias
```

## Módulos do app desktop

O app desktop/admin deve ter os módulos:

```txt
Dashboard
Produtos
Categorias
Ofertas e links afiliados
Marketplaces
Campanhas
Cliques
Impressões
Buscas
Conteúdos e guias
Ranking editorial
Conformidade
Saúde do catálogo
Importação de relatórios afiliados
Configurações
Usuários admin
Logs de auditoria
```

## Dados administrativos e auditoria

Ações administrativas precisam gerar log.

Campos recomendados:

```txt
id
admin_id
acao
entidade_tipo
entidade_id
antes_json
depois_json
ip_hash
user_agent_hash
criado_em
```

Ações a auditar:

```txt
login admin
tentativa de login falha
produto criado
produto editado
produto pausado
produto removido
link alterado
oferta criada
oferta pausada
categoria criada
campanha criada
nota editorial alterada
conformidade alterada
relatório afiliado importado
```

## Modelo de tabelas recomendado

```txt
admins
admin_sessions
products
product_categories
product_tags
product_tag_relations
marketplaces
affiliate_programs
product_offers
affiliate_links
impression_events
click_events
search_events
campaigns
campaign_links
community_posts
content_pages
content_product_relations
editorial_reviews
compliance_checks
link_health_checks
affiliate_report_imports
daily_product_metrics
daily_category_metrics
daily_marketplace_metrics
daily_campaign_metrics
daily_search_metrics
audit_logs
app_settings
```

## Eventos brutos vs métricas agregadas

### Eventos brutos

Tabelas:

```txt
impression_events
click_events
search_events
```

Uso:

- auditoria;
- análises detalhadas;
- reprocessamento;
- investigação de picos ou quedas.

### Métricas agregadas

Tabelas:

```txt
daily_product_metrics
daily_category_metrics
daily_marketplace_metrics
daily_campaign_metrics
daily_search_metrics
```

Uso:

- dashboards rápidos;
- relatórios por período;
- gráficos;
- comparação histórica.

## Dados que não devem ser coletados no MVP

Evitar:

```txt
nome do visitante
CPF do visitante
telefone sem consentimento
e-mail sem finalidade clara
localização precisa
histórico identificável de navegação
dados de pagamento
dados de compra
dados do pedido no marketplace
```

Como a Loja do Korre não processa pagamento ou entrega, não há motivo para armazenar dados sensíveis de comprador no MVP.

## MVP de dados

Para começar, implementar somente o essencial:

```txt
1. Cadastro de produtos
2. Cadastro de categorias
3. Cadastro de marketplaces
4. Cadastro de ofertas/link afiliado
5. Registro de impressões
6. Registro de cliques
7. Registro de buscas
8. Campanhas com UTM
9. Dashboard de cliques
10. Ranking por CTR
11. Saúde dos links
12. Nota editorial manual
13. Status de conformidade
14. Relatório por marketplace
15. Relatório por origem
16. Logs administrativos
```

## Critérios de aceite do MVP

O backend/admin estará pronto para a primeira operação quando permitir:

```txt
- cadastrar produto com categoria, veículo e problema resolvido;
- cadastrar uma ou mais ofertas afiliadas para o produto;
- gerar URL interna rastreável de clique;
- registrar clique de saída;
- registrar impressão de produto;
- registrar busca interna;
- visualizar produtos mais clicados;
- visualizar produtos com melhor CTR;
- visualizar produtos sem clique;
- visualizar links quebrados;
- marcar produto como em revisão, ativo, pausado ou bloqueado;
- dar nota editorial manual;
- registrar status de conformidade;
- importar relatório agregado de afiliado;
- visualizar métricas por marketplace, categoria, campanha e origem;
- registrar ações administrativas em audit log.
```

## Resumo final

O backend e o app de gestão da Loja do Korre devem transformar cliques em inteligência operacional.

A gestão não deve depender apenas de venda confirmada.

A base de decisão deve ser:

```txt
curadoria
+ impressões
+ cliques qualificados
+ origem
+ categoria
+ campanha
+ busca interna
+ qualidade editorial
+ conformidade
+ saúde de links
+ relatórios agregados dos afiliados
```

Essa estrutura permite evoluir de uma vitrine afiliada simples para uma operação de inteligência comercial focada no trabalhador sobre rodas.
