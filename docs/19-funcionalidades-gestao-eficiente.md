# Funcionalidades para gestão eficiente — Loja do Korre

## Objetivo

Definir as funcionalidades que o backend e o app desktop/admin da Loja do Korre devem ter para permitir uma operação eficiente, organizada e orientada a resultado.

A Loja do Korre começa como ecommerce afiliado. Portanto, o sistema precisa ajudar a responder perguntas operacionais como:

- quais produtos estão gerando mais interesse?
- quais produtos aparecem no site e em qual ordem?
- quais imagens, títulos, badges e CTAs geram mais cliques?
- quais links estão funcionando?
- quais categorias precisam de mais produtos?
- quais produtos devem ser pausados, revisados ou destacados?
- quais campanhas estão trazendo tráfego qualificado?
- quais canais funcionam melhor?
- quais produtos têm risco de conformidade?

## Princípio de eficiência

O sistema de gestão não deve ser apenas um CRUD de produtos.

Ele deve ser um painel operacional para melhorar a loja continuamente.

```txt
Cadastrar
↓
Publicar
↓
Medir
↓
Comparar
↓
Corrigir
↓
Destacar
↓
Revisar
↓
Repetir
```

## Módulos principais do app desktop

### 1. Dashboard executivo

Tela inicial do admin.

Deve mostrar:

- cliques hoje;
- cliques nos últimos 7 dias;
- cliques nos últimos 30 dias;
- variação em relação ao período anterior;
- produtos mais clicados;
- categorias mais clicadas;
- marketplaces mais clicados;
- origens com mais cliques;
- campanhas ativas;
- produtos sem clique;
- alertas de links quebrados;
- alertas de imagens ausentes;
- produtos pendentes de conformidade;
- produtos que precisam de revisão.

A tela precisa ter atalhos para ações:

- cadastrar produto;
- revisar catálogo;
- ver relatório de cliques;
- abrir saúde do catálogo;
- criar campanha;
- configurar vitrine.

### 2. Gestão de produtos

Funcionalidades:

- criar produto;
- editar produto;
- duplicar produto;
- ativar/inativar produto;
- pausar produto temporariamente;
- excluir logicamente produto;
- buscar por nome, slug, tag ou categoria;
- filtrar por veículo, público, problema e status;
- definir prioridade;
- definir se produto é destaque;
- informar motivo da recomendação;
- informar cuidados antes da compra;
- associar categorias e tags;
- associar imagens;
- associar ofertas e links afiliados;
- ver desempenho do produto na mesma tela.

Campos estratégicos:

```txt
nome
slug
descricao_curta
descricao_longa
tipo_veiculo
publico
problema_resolvido
categoria
subcategoria
tags
status
prioridade
destaque
motivo_recomendacao
cuidados_antes_de_comprar
nota_editorial
status_conformidade
observacoes_internas
```

### 3. Gestão de ofertas e links afiliados

Cada produto pode ter uma ou mais ofertas.

Funcionalidades:

- cadastrar oferta do Mercado Livre;
- cadastrar oferta de Amazon, Shopee, Magalu ou outros no futuro;
- definir marketplace principal;
- informar URL original;
- informar URL afiliada;
- gerar URL curta interna;
- ativar/inativar oferta;
- marcar oferta como expirada;
- informar preço de referência;
- informar observação de preço sujeito a alteração;
- registrar seller/vendedor;
- registrar reputação do vendedor;
- registrar data da última verificação;
- verificar se link está funcionando;
- visualizar cliques por oferta.

Relatórios úteis:

- ofertas mais clicadas;
- ofertas sem clique;
- ofertas quebradas;
- ofertas antigas sem revisão;
- marketplace com maior clique;
- produtos com múltiplas ofertas e melhor marketplace por clique.

### 4. Gestão de vitrine

Permite controlar como os produtos aparecem no site.

Funcionalidades:

- selecionar contexto de vitrine;
- listar produtos exatamente na ordem pública;
- arrastar e soltar para reordenar;
- fixar produto no topo;
- remover produto do contexto sem excluir do catálogo;
- definir destaque;
- definir badge;
- definir CTA;
- definir imagem usada naquele contexto;
- agendar início/fim da exibição;
- visualizar preview do card;
- comparar desempenho por posição;
- duplicar vitrine para outra categoria.

Contextos:

```txt
home
categoria
subcategoria
kit
guia
comparativo
campanha
busca
ofertas verificadas
```

### 5. Gestão de imagens

As imagens ficam no GitHub, e o backend salva apenas referência.

Funcionalidades:

- cadastrar referência de imagem;
- listar imagens por produto;
- definir imagem principal;
- definir imagem de card;
- definir thumbnail;
- definir galeria;
- definir imagem para comparativo;
- editar texto alternativo;
- registrar origem/licença;
- marcar imagem como ativa/inativa;
- validar se imagem existe no caminho público;
- alertar imagem quebrada;
- alertar imagem pesada;
- alertar imagem sem alt text;
- copiar caminho público;
- abrir imagem em preview.

Fluxo MVP:

```txt
Imagem adicionada no repositório GitHub
↓
Deploy publica arquivo
↓
Admin cadastra caminho da imagem
↓
Backend salva referência
↓
Site usa URL retornada pela API
```

### 6. Gestão de categorias e taxonomia

Funcionalidades:

- criar categoria;
- criar subcategoria;
- definir veículo relacionado;
- definir problema resolvido;
- ordenar categorias;
- ativar/inativar categoria;
- definir ícone;
- definir imagem de fallback;
- definir descrição SEO;
- ver produtos associados;
- ver desempenho da categoria.

Taxonomia base:

```txt
Para carro
Para moto
Para bicicleta
Kits por problema
Ofertas verificadas
Guias e comparativos
```

Subcategorias exemplo:

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

### 7. Gestão de campanhas

Funcionalidades:

- criar campanha;
- definir canal;
- definir UTM;
- associar produtos;
- associar ofertas;
- associar vitrine;
- definir data de início/fim;
- gerar links rastreáveis;
- medir cliques;
- comparar campanhas;
- identificar horário de melhor desempenho.

Canais:

```txt
WhatsApp
Telegram
Instagram
TikTok
YouTube
Google
SEO
Direto
App KORRE
```

Relatórios:

- cliques por campanha;
- cliques por canal;
- produtos clicados na campanha;
- marketplace mais clicado;
- horário de pico;
- campanha com maior CTR;
- campanha sem resultado.

### 8. Relatórios de cliques

Funcionalidades:

- relatório geral de cliques;
- relatório por produto;
- relatório por categoria;
- relatório por marketplace;
- relatório por campanha;
- relatório por origem;
- relatório por página;
- relatório por dispositivo;
- comparação entre períodos;
- exportação CSV;
- filtro por data;
- filtro por status de produto;
- filtro por veículo;
- filtro por canal.

Métricas:

```txt
cliques totais
cliques únicos aproximados
impressões
CTR
cliques por dia
cliques por hora
cliques por origem
cliques por marketplace
cliques por campanha
posição média do card
imagem usada
CTA usado
badge usado
```

### 9. Gestão de buscas internas

A busca mostra demanda real do público.

Funcionalidades:

- listar termos mais buscados;
- listar buscas sem resultado;
- listar buscas com clique;
- listar buscas sem clique;
- associar termo a categoria;
- criar sugestão de produto com base em busca;
- criar alerta quando uma busca sem resultado cresce;
- exportar termos buscados.

Exemplos de decisão:

```txt
Muitas buscas por “capa chuva moto”
↓
Criar categoria ou guia
↓
Cadastrar melhores produtos
↓
Medir cliques
```

### 10. Saúde do catálogo

Tela para identificar problemas.

Alertas:

- produto sem imagem;
- produto sem oferta ativa;
- produto sem categoria;
- produto sem motivo de recomendação;
- produto sem aviso de afiliado;
- produto com link quebrado;
- produto desatualizado;
- produto sem clique há 30 dias;
- produto com muitas impressões e baixo CTR;
- produto de segurança sem conformidade;
- imagem ausente;
- imagem sem alt text;
- categoria vazia;
- campanha expirada ainda ativa.

Ações rápidas:

- pausar produto;
- revisar produto;
- trocar imagem;
- trocar link;
- mover categoria;
- abrir relatório;
- marcar como revisado.

### 11. Ranking editorial

O sistema deve permitir nota editorial manual e cálculo automático.

Critérios:

```txt
adequacao_ao_uso
qualidade_reputacao
preco_total
prazo_entrega
garantia_devolucao
conversao_historica
seguranca
compatibilidade
```

Fórmula base:

```txt
Pontuação =
30% adequação ao uso
20% qualidade e reputação
15% preço total
15% prazo
10% garantia/devolução
10% desempenho histórico
```

A comissão não deve ser critério principal.

### 12. Conformidade e segurança de produtos

Funcionalidades:

- marcar se produto exige certificação;
- cadastrar certificação informada;
- marcar se certificação foi verificada;
- bloquear produto sem conformidade mínima;
- criar alerta de revisão;
- registrar fonte de verificação;
- registrar observação pública de cuidado;
- registrar observação interna.

Produtos sensíveis:

- capacetes;
- carregadores;
- eletrônicos;
- câmeras;
- iluminação;
- itens de segurança;
- ferramentas;
- acessórios para moto/bike.

### 13. Importação manual de relatórios afiliados

Mesmo sem venda por produto, o sistema deve aceitar lançamento manual de dados agregados dos programas afiliados.

Funcionalidades:

- cadastrar período;
- marketplace;
- cliques reportados;
- pedidos reportados, se houver;
- comissão aprovada;
- comissão pendente;
- comissão cancelada;
- observações;
- arquivo de origem, se houver;
- comparar com cliques internos.

Objetivo:

```txt
Nossos cliques enviados
vs
Relatório do marketplace
vs
Comissão aprovada
```

Isso permite estimar EPC e RPM por marketplace.

### 14. Configurações do sistema

Funcionalidades:

- configurar domínio público;
- configurar URL base da API;
- configurar marketplaces ativos;
- configurar aviso de afiliado padrão;
- configurar fallback de imagem;
- configurar regras de cache;
- configurar limites de rastreamento;
- configurar retenção de logs;
- configurar usuários admin;
- configurar permissões.

### 15. Usuários administrativos e permissões

Perfis sugeridos:

```txt
owner
admin
editor
analyst
viewer
```

Permissões:

- owner: tudo;
- admin: gestão geral;
- editor: produtos, imagens, categorias e conteúdo;
- analyst: relatórios e métricas;
- viewer: somente leitura.

### 16. Logs de auditoria

Registrar:

- login admin;
- tentativa de login falha;
- produto criado;
- produto editado;
- produto pausado;
- link alterado;
- imagem alterada;
- vitrine reordenada;
- campanha criada;
- configuração alterada;
- relatório importado.

Campos:

```txt
admin_id
action
entity_type
entity_id
before_json
after_json
ip_hash
user_agent_hash
created_at
```

## Funcionalidades fora do MVP

Não implementar no primeiro momento:

- checkout próprio;
- pagamento próprio;
- estoque próprio;
- integração fiscal;
- upload automático de imagem via desktop;
- scraping de marketplace;
- automação agressiva de preços;
- IA gerando recomendação sem revisão humana;
- rastreamento pessoal invasivo;
- coleta de CPF/telefone do visitante sem finalidade clara.

## MVP recomendado

Para começar eficiente, implementar:

```txt
1. Login admin.
2. CRUD de produtos.
3. CRUD de categorias.
4. CRUD de ofertas afiliadas.
5. Cadastro de referências de imagens.
6. Configuração de vitrine por contexto.
7. Registro de impressões.
8. Registro de cliques.
9. Relatório de cliques por produto.
10. Relatório de produtos mais clicados.
11. Relatório de CTR.
12. Saúde do catálogo.
13. Ranking editorial manual.
14. Conformidade básica.
15. Logs de auditoria.
```

## Critérios de aceitação

O sistema será considerado eficiente quando permitir:

- controlar quais produtos aparecem no site;
- controlar em qual ordem aparecem;
- controlar quais imagens aparecem;
- medir cliques por produto;
- medir CTR por produto;
- medir cliques por categoria;
- medir cliques por campanha;
- identificar produtos fracos;
- identificar produtos fortes;
- identificar links quebrados;
- identificar imagens ausentes;
- revisar produtos sensíveis;
- gerar relatórios úteis sem depender de venda confirmada;
- operar a loja sem editar código diariamente.

## Visão final

O app desktop deve ser o centro de comando da Loja do Korre.

Ele deve permitir que a operação seja feita assim:

```txt
Curadoria de produto
↓
Configuração da vitrine
↓
Publicação no site
↓
Medição de cliques
↓
Análise de desempenho
↓
Correção e otimização
↓
Nova publicação
```

A meta é transformar a Loja do Korre em uma operação de afiliados guiada por dados, mas ainda baseada em curadoria responsável e utilidade real para motoristas, motoboys, entregadores e ciclistas.
