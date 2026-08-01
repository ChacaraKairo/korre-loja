# Admin: vitrine, imagens e relatórios de cliques — KORRE Loja

## Objetivo

Definir como o backend e o app desktop de gestão devem permitir controlar a forma como os produtos aparecem no site, quais imagens serão usadas, como os cliques serão medidos e quais relatórios precisam existir para operar a KORRE Loja com qualidade.

Este documento complementa o documento `17-backend-admin-dados-e-gestao.md`.

O foco aqui é:

- relatórios de cliques em produtos;
- listagem dos produtos exatamente como aparecem no site;
- configuração de posição, destaque e aparência dos produtos;
- gestão de imagens por produto;
- uso de imagens versionadas no GitHub;
- backend referenciando imagens, sem armazenar binários no banco;
- app desktop como painel central de configuração.

## Princípio central

O sistema desktop deve permitir que o administrador controle a vitrine sem editar código manualmente.

O site público deve consumir a configuração publicada pelo backend.

```txt
Admin Desktop
↓
Configura produto, imagem, posição, destaque e link
↓
Backend salva referências e regras de exibição
↓
Site busca configuração pública
↓
Usuário vê a vitrine configurada
↓
Clique é registrado pelo backend
↓
Admin Desktop mostra relatórios
```

## Separação entre imagem e referência

As imagens dos produtos devem ficar no repositório GitHub do projeto, versionadas junto com o código ou com os assets públicos.

O backend não deve armazenar o arquivo da imagem como blob no banco.

O backend deve armazenar apenas referências:

- caminho relativo no repositório;
- caminho público no site;
- URL pública gerada no deploy;
- descrição alternativa;
- tipo de uso;
- status da imagem;
- metadados para organização.

## Estrutura recomendada para imagens no repositório

Sugestão de organização:

```txt
apps/web-store/public/assets/products/
  suporte-celular-antivibracao-moto/
    main.webp
    card.webp
    gallery-01.webp
    gallery-02.webp
    thumb.webp
  capa-chuva-motoboy-reforcada/
    main.webp
    card.webp
    gallery-01.webp
    thumb.webp
```

Alternativa se o projeto ainda não tiver `apps/web-store`:

```txt
assets/products/
  suporte-celular-antivibracao-moto/
    main.webp
    card.webp
    gallery-01.webp
    gallery-02.webp
    thumb.webp
```

## Convenção de nomes

As imagens devem seguir padrão previsível:

```txt
main.webp       imagem principal da página de produto
card.webp       imagem usada em cards da vitrine
thumb.webp      miniatura para listas e admin
gallery-01.webp imagem secundária
gallery-02.webp imagem secundária
comparison.webp imagem usada em comparativos, se existir
banner.webp     imagem usada em campanha ou seção destacada
```

Regras:

- usar slug do produto na pasta;
- evitar espaços, acentos e caracteres especiais;
- preferir `.webp` para imagens otimizadas;
- manter fallback se a imagem estiver ausente;
- não usar imagens copiadas sem direito de uso;
- não afirmar propriedade sobre imagens de marketplace;
- registrar origem/licença quando necessário;
- evitar arquivos pesados demais para mobile.

## Modelo de dados para imagens

Tabela sugerida:

```txt
product_images
```

Campos:

```txt
id
product_id
image_type: main | card | thumb | gallery | comparison | banner
repo_path
public_path
public_url
alt_text
title
caption
source_type: own | marketplace_allowed | manufacturer | generated | unknown
source_url
license_note
width
height
format
file_size_kb
sort_order
is_active
is_fallback
created_at
updated_at
```

Exemplo:

```txt
product_id: suporte-celular-antivibracao-moto
image_type: card
repo_path: apps/web-store/public/assets/products/suporte-celular-antivibracao-moto/card.webp
public_path: /assets/products/suporte-celular-antivibracao-moto/card.webp
alt_text: Suporte de celular para moto com fixação no guidão
sort_order: 1
is_active: true
```

## Como o backend deve expor as imagens

Endpoint público de produto deve retornar as imagens já resolvidas:

```json
{
  "id": "product_123",
  "name": "Suporte de celular antivibração para moto",
  "slug": "suporte-celular-antivibracao-moto",
  "images": {
    "main": {
      "url": "/assets/products/suporte-celular-antivibracao-moto/main.webp",
      "alt": "Suporte de celular para moto com fixação no guidão"
    },
    "card": {
      "url": "/assets/products/suporte-celular-antivibracao-moto/card.webp",
      "alt": "Suporte de celular antivibração para moto"
    },
    "gallery": [
      {
        "url": "/assets/products/suporte-celular-antivibracao-moto/gallery-01.webp",
        "alt": "Detalhe da garra do suporte"
      }
    ]
  }
}
```

O site não deve escolher imagem por conta própria quando houver configuração no backend.

Prioridade de imagem:

```txt
1. imagem configurada no backend para aquele contexto;
2. imagem principal do produto;
3. imagem fallback da categoria;
4. imagem fallback global da loja.
```

## Configuração de exibição da vitrine

O admin desktop deve permitir configurar como cada produto aparece no site.

Tabela sugerida:

```txt
product_display_settings
```

Campos:

```txt
id
product_id
context_type: home | category | search | guide | comparison | kit | campaign
context_id
position
is_featured
featured_label
badge_text
badge_type: best_seller | recommended | verified | new | discount | safety | rain | energy | comfort
cta_text
short_display_title
short_display_subtitle
highlight_reason
show_price
show_rating
show_seller
show_delivery_hint
show_marketplace
show_affiliate_notice
is_active
starts_at
ends_at
created_at
updated_at
```

Exemplos de contexto:

```txt
home: produto aparece na home
category:moto-suportes-navegacao: produto aparece nessa categoria
kit:kit-chuva: produto aparece no kit chuva
guide:melhor-suporte-celular-moto: produto aparece em um guia específico
campaign:telegram-ofertas-agosto: produto aparece em campanha específica
```

## Ordenação dos produtos no site

O desktop deve permitir três modos de ordenação.

### 1. Manual

O administrador define a ordem explicitamente.

Uso:

- home;
- campanhas;
- kits;
- listas promocionais;
- vitrines de curadoria.

### 2. Automática por métrica

O backend ordena por:

- mais clicados;
- maior CTR;
- melhor pontuação editorial;
- mais recentes;
- mais revisados;
- maior confiança.

### 3. Híbrida

Produtos fixados manualmente aparecem primeiro, e o restante é ordenado por métrica.

Regra recomendada para o MVP:

```txt
Home: híbrida
Categorias: híbrida
Busca: relevância textual + status ativo + qualidade editorial
Guias: manual
Kits: manual
Ofertas verificadas: atualização recente + qualidade + clique
```

## Relatórios de cliques em produtos

O app desktop precisa ter uma área de relatórios com filtros e visualizações.

### Filtros obrigatórios

```txt
período
produto
categoria
subcategoria
veículo: carro | moto | bicicleta | todos
marketplace
origem do tráfego
campanha
página de origem
tipo de página
posição do card
dispositivo
status do produto
status do link
```

### Métricas principais

```txt
cliques totais
cliques únicos aproximados
impressões
CTR
cliques por dia
cliques por hora
cliques por origem
cliques por marketplace
cliques por categoria
cliques por campanha
cliques por posição do card
produtos mais clicados
produtos com maior CTR
produtos com muitas impressões e poucos cliques
produtos sem clique
```

## Relatório: produtos como aparecem no site

O admin precisa ter uma visualização que liste os produtos na mesma ordem e contexto em que aparecem no site.

Exemplo de tela:

```txt
Vitrine: Home
Modo: público atual

1. Suporte de celular antivibração
   Imagem: card.webp
   Badge: Recomendado para moto
   CTA: Ver preço no Mercado Livre
   Status: Ativo
   Cliques 7 dias: 143
   CTR: 8,2%

2. Capa de chuva reforçada
   Imagem: card.webp
   Badge: Chuva forte
   CTA: Conferir oferta
   Status: Ativo
   Cliques 7 dias: 91
   CTR: 6,5%
```

Funções nessa tela:

- arrastar para reordenar;
- ativar/inativar produto no contexto;
- trocar imagem usada no card;
- alterar badge;
- alterar CTA;
- ver prévia do card;
- abrir relatório do produto;
- duplicar configuração para outra categoria;
- agendar início/fim de exibição.

## Preview de card no admin

O desktop deve mostrar preview aproximado do card público.

Campos editáveis com preview:

- imagem do card;
- título curto;
- subtítulo curto;
- badge;
- marketplace principal;
- preço de referência;
- CTA;
- aviso de afiliado;
- selo de verificação;
- motivo de recomendação.

## Gestão de imagens no desktop

O admin desktop deve permitir:

- listar imagens cadastradas por produto;
- definir imagem principal;
- definir imagem de card;
- definir imagem de thumbnail;
- definir ordem da galeria;
- editar alt text;
- registrar origem da imagem;
- marcar imagem como ativa/inativa;
- detectar imagem ausente;
- mostrar caminho no GitHub;
- copiar caminho público;
- validar tamanho e formato esperado.

## Upload ou referência?

Para o MVP, a recomendação é: **sem upload direto pelo desktop**.

Fluxo recomendado:

```txt
1. Administrador adiciona imagem na pasta correta do repositório.
2. Faz commit/push.
3. Deploy do site publica a imagem.
4. No Admin Desktop, cadastra ou seleciona o caminho da imagem.
5. Backend salva apenas a referência.
6. Site usa a referência retornada pela API.
```

No futuro, o app desktop pode automatizar esse processo via GitHub API, mas isso deve exigir:

- autenticação segura;
- controle de branch;
- criação de PR;
- validação de arquivo;
- compressão/otimização;
- auditoria.

## Saúde das imagens

O backend deve ter verificação periódica de imagens.

Relatório de problemas:

```txt
produto sem imagem principal
produto sem imagem de card
imagem referenciada não existe
imagem pesada demais
imagem sem alt text
imagem com source_type unknown
imagem sem licença/origem
imagem quebrada no site
imagem com proporção ruim para card
```

## Eventos de clique enriquecidos

O registro de clique deve capturar o contexto de exibição.

Campos adicionais em `click_events`:

```txt
display_context_type
display_context_id
product_display_setting_id
card_position
image_id_used
badge_text_used
cta_text_used
price_reference_used
marketplace_clicked
redirect_success
redirect_latency_ms
```

Isso permite responder perguntas como:

- a imagem A gerou mais clique que a imagem B?
- o badge “Resistente à chuva” aumentou CTR?
- o CTA “Ver preço” performa melhor que “Comprar no Mercado Livre”?
- produtos na posição 1 clicam mais que posição 4?
- uma categoria tem tráfego mas baixa conversão de clique?

## Testes A/B futuros

O sistema deve ser preparado para testes A/B simples.

Tabela futura:

```txt
display_experiments
```

Campos:

```txt
id
name
context_type
context_id
status
starts_at
ends_at
metric_goal: ctr | clicks | outbound_rate
variant_a_json
variant_b_json
winner_variant
created_at
updated_at
```

Primeiros testes possíveis:

- imagem A vs imagem B;
- CTA “Ver preço” vs “Conferir oferta”;
- badge com benefício vs badge com desconto;
- ordem manual vs ordem por CTR;
- card com preço vs card sem preço.

## Endpoints necessários

### Públicos

```txt
GET /public/storefront/home
GET /public/storefront/categories/:slug
GET /public/products/:slug
POST /public/impressions
POST /public/clicks
```

### Admin

```txt
GET /admin/storefront/contexts
GET /admin/storefront/contexts/:contextType/:contextId/products
PUT /admin/storefront/contexts/:contextType/:contextId/products/order
PATCH /admin/storefront/display-settings/:id
POST /admin/storefront/display-settings
DELETE /admin/storefront/display-settings/:id

GET /admin/products/:id/images
POST /admin/products/:id/images
PATCH /admin/product-images/:id
DELETE /admin/product-images/:id

GET /admin/reports/clicks/products
GET /admin/reports/clicks/products/:productId
GET /admin/reports/clicks/categories
GET /admin/reports/clicks/marketplaces
GET /admin/reports/clicks/campaigns
GET /admin/reports/storefront-performance
GET /admin/reports/image-performance
GET /admin/reports/catalog-health
```

## Telas necessárias no app desktop

### 1. Dashboard geral

- cliques hoje;
- cliques 7 dias;
- cliques 30 dias;
- produtos mais clicados;
- categorias mais clicadas;
- marketplaces mais clicados;
- produtos com CTR alto;
- produtos com CTR baixo;
- alertas de catálogo.

### 2. Gestão de vitrine

- selecionar contexto: home, categoria, kit, guia, campanha;
- listar produtos na ordem pública;
- reordenar produtos;
- ativar/inativar produto no contexto;
- configurar badge, CTA e imagem;
- preview do card;
- salvar configuração.

### 3. Gestão de imagens

- listar imagens por produto;
- cadastrar referência de imagem;
- definir imagem principal/card/thumb/galeria;
- editar alt text;
- validar imagem ausente;
- ver origem/licença.

### 4. Relatórios de cliques

- gráfico de cliques por dia;
- tabela de produtos;
- filtros;
- exportação CSV;
- comparação de períodos;
- detalhamento por produto.

### 5. Relatório de performance visual

- cliques por imagem usada;
- CTR por tipo de card;
- CTR por badge;
- CTR por CTA;
- CTR por posição.

### 6. Saúde do catálogo

- links quebrados;
- imagens ausentes;
- produtos sem categoria;
- produtos sem oferta ativa;
- produtos sem clique;
- produtos desatualizados;
- produtos sem aviso de afiliado;
- produtos com conformidade pendente.

## Critérios de aceitação do MVP

O recurso estará pronto quando:

- o admin conseguir ver os produtos como aparecem no site;
- o admin conseguir alterar ordem, destaque, badge, CTA e imagem usada;
- o backend expor a vitrine configurada por contexto;
- o site consumir essa configuração;
- cada clique registrar produto, oferta, contexto, posição e imagem usada;
- o admin conseguir gerar relatório de cliques por produto;
- o admin conseguir comparar cliques por período;
- o admin conseguir identificar produtos sem clique;
- o admin conseguir identificar imagens quebradas ou ausentes;
- o banco guardar apenas referências às imagens, não arquivos binários;
- as imagens ficarem versionadas no GitHub.

## Decisão técnica para o MVP

Para a primeira versão:

```txt
Imagens: versionadas no GitHub
Backend: salva referências
Admin Desktop: cadastra/edita referências
Site: consome imagens por URL pública
Upload direto: fora do MVP
A/B testing: preparado, mas não obrigatório
```

Essa decisão mantém o sistema simples, auditável e barato, sem impedir evolução futura para upload automatizado via GitHub API ou storage dedicado.
