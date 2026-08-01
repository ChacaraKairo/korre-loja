# Conformidade: afiliados, LGPD, cookies e publicidade — KORRE Loja

## Objetivo

Definir regras mínimas de conformidade para a operação da KORRE Loja como ecommerce afiliado.

Este documento não substitui revisão jurídica. Ele serve como guia operacional para evitar erros básicos de transparência, publicidade, privacidade e regras de programas de afiliados.

## Princípio central

A KORRE Loja deve ser transparente: o usuário precisa entender quando está vendo uma recomendação afiliada, para onde será redirecionado e quem será responsável pela venda, pagamento, frete, entrega e pós-venda.

## Aviso de afiliado

Toda página com links de afiliado deve exibir aviso visível antes ou próximo ao CTA.

Texto padrão recomendado:

> Alguns links desta página são de afiliados. Podemos receber uma comissão se você comprar pelo link, sem custo adicional para você. A classificação considera utilidade, segurança, preço total e reputação — não apenas comissão.

## Aviso de saída para marketplace

Antes do redirecionamento ou no próprio card, deixar claro:

> Você continuará a compra no marketplace parceiro. Preço, entrega, pagamento, garantia e pós-venda serão definidos pela loja de destino.

## Atributos em links

Links afiliados públicos devem usar, quando aplicável:

```html
rel="sponsored nofollow noopener noreferrer"
```

Também devem abrir de forma segura quando forem externos:

```html
target="_blank"
```

## Política editorial

Receber comissão não deve garantir posição superior em ranking, guia ou comparativo.

Critérios mínimos de recomendação:

- adequação ao uso;
- segurança;
- compatibilidade;
- preço total;
- prazo;
- reputação do vendedor;
- garantia/devolução;
- desempenho histórico;
- comissão apenas como critério secundário ou de desempate.

## Rotulagem em redes e comunidades

Toda postagem com link afiliado em WhatsApp, Telegram, Instagram, TikTok, YouTube, e-mail ou comunidade deve indicar natureza comercial.

Marcadores aceitos:

- #linkdeafiliado;
- #publi;
- #anúncio;
- aviso textual no início ou fim da mensagem.

Exemplo:

> #linkdeafiliado Podemos receber comissão se você comprar por este link, sem custo extra.

## Veracidade técnica

Nunca declarar característica técnica sem comprovação.

Exemplos que exigem atenção:

- homologado pelo INMETRO;
- certificado pela ANATEL;
- impermeável;
- resistente a chuva forte;
- antivibração;
- compatível com determinado modelo;
- seguro para uso profissional;
- aprovado para capacete/moto/bike.

Se não houver comprovação, usar linguagem cautelosa:

- “o anúncio informa...”;
- “verifique a certificação antes da compra”;
- “confirme compatibilidade no marketplace”;
- “preço e condições podem mudar”.

## Capacetes e itens de segurança

Capacetes e equipamentos de proteção devem receber tratamento editorial especial.

Regras:

- exigir campo de certificação aplicável;
- mostrar alerta de verificação;
- evitar promover produto sem indicação clara de conformidade;
- evitar usar apenas selos estrangeiros como garantia de adequação ao Brasil;
- destacar que o usuário deve conferir certificação, tamanho e condições do produto.

## Cookies e consentimento

A KORRE Loja deve implementar banner de cookies quando usar:

- analytics;
- pixels de rastreamento;
- identificadores de afiliado;
- tags de marketing;
- remarketing;
- ferramentas de mapa de calor;
- captura de leads.

O banner deve permitir:

- aceitar todos;
- rejeitar não essenciais;
- configurar preferências;
- acessar política de privacidade.

## Política de privacidade

A política deve explicar:

- controlador;
- finalidades;
- dados coletados;
- cookies;
- fornecedores;
- links afiliados;
- analytics;
- formulários;
- canais de WhatsApp/Telegram;
- direitos do usuário;
- contato.

Copy sugerida:

> Usamos dados de navegação para medir cliques, melhorar o conteúdo e entender quais produtos ajudam mais os usuários, conforme suas escolhas de consentimento.

## Dados que podem ser coletados no MVP

Evitar coletar dados pessoais no fluxo de compra, porque o checkout acontece no marketplace.

Dados aceitáveis para métricas:

- produto clicado;
- categoria;
- marketplace de destino;
- campanha;
- origem do clique;
- data/hora;
- dispositivo aproximado;
- página de origem;
- consentimento de cookies, quando aplicável.

Evitar no MVP:

- CPF;
- documento;
- endereço;
- telefone sem necessidade;
- dados de pagamento;
- dados de pedido do marketplace;
- dados pessoais sensíveis.

## Programas de afiliados

Antes de ativar qualquer programa, registrar no banco ou planilha:

| Campo | Pergunta de controle |
|---|---|
| Comissão | É fixa, por categoria, por seller, por campanha ou por novo cliente? |
| Atribuição | Qual é a janela? Vale último clique? App e desktop conectam? |
| Aprovação | Quando a venda vira elegível para pagamento? |
| Reversão | Cancelamento, devolução ou fraude retiram comissão? |
| Mídia paga | Pode anunciar direto para produto? Brand bidding é proibido? |
| Link | Pode encurtar/redirecionar? Precisa preservar parâmetros? |
| Conteúdo | Pode armazenar imagens e descrições? Por quanto tempo? |
| Preço | Existe obrigação de atualizar/remover preço desatualizado? |
| Dados | Há dados transacionais ou só relatórios agregados? |
| Pagamento | Há saldo mínimo, prazo ou documento fiscal? |
| Território | Cobre consumidores e publishers brasileiros? |
| Encerramento | O anunciante pode alterar comissão ou suspender unilateralmente? |

## Marketplace não é vendedor próprio

A KORRE Loja deve deixar claro:

- a compra acontece no marketplace;
- o pagamento acontece no marketplace;
- a entrega é responsabilidade da loja parceira;
- preço e frete podem mudar;
- garantia e devolução seguem regras do destino.

## Dropshipping não é afiliado

Não confundir modelos.

Afiliado:

- a venda acontece no parceiro;
- a KORRE Loja recebe comissão;
- o parceiro processa pagamento, entrega e pós-venda.

Dropshipping:

- a loja aparece como vendedora;
- assume atendimento, entrega, arrependimento, fiscal e qualidade;
- exige outra estrutura jurídica, operacional e fiscal.

## Checklist de conformidade por página

Antes de publicar uma página de produto, guia ou comparativo:

- [ ] Existe aviso de afiliado visível?
- [ ] O CTA deixa claro que a compra será fora da KORRE Loja?
- [ ] Links externos usam rel adequado?
- [ ] Preço tem data de atualização ou aviso de alteração?
- [ ] Produto de segurança tem alerta de certificação?
- [ ] Ranking tem metodologia?
- [ ] Comissão não é o único critério de ordenação?
- [ ] Dados pessoais não são coletados sem necessidade?
- [ ] Cookies/analytics respeitam consentimento?
- [ ] Conteúdo não copia descrição de marketplace sem autorização?

## Decisão para o MVP

No MVP, usar apenas:

- links afiliados oficiais;
- cadastro manual de produtos;
- métricas próprias de clique;
- aviso de afiliado;
- política de privacidade;
- banner de cookies;
- sem checkout próprio;
- sem processamento de pagamento;
- sem scraping automático.
