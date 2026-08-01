# PRD do MVP — KORRE Loja

## Objetivo do MVP

Criar a primeira versão funcional da KORRE Loja como uma vitrine afiliada especializada para motoristas, motoboys e entregadores.

O MVP deve validar:

- quais categorias geram mais clique;
- quais produtos têm maior interesse;
- quais páginas trazem tráfego orgânico;
- quais CTAs convertem melhor;
- quais marketplaces são mais úteis para o público;
- se a curadoria especializada gera confiança.

## Escopo do MVP

### Incluído

- Site público mobile-first.
- Backend com API NestJS.
- PostgreSQL.
- Prisma.
- Admin desktop Electron.
- Cadastro manual de produtos.
- Cadastro manual de links afiliados.
- Categorias por veículo e problema.
- Registro de cliques.
- Dashboard de produtos mais clicados.
- Aviso de afiliado.
- Política de privacidade e cookies.
- Relatórios básicos.

### Não incluído

- Checkout próprio.
- Pagamento próprio.
- Estoque próprio.
- Dropshipping.
- Integração automática com marketplaces.
- Scraping.
- Garantia ou pós-venda próprios.
- Importação massiva de milhares de produtos.
- Recomendação automatizada sem curadoria.

## Público-alvo inicial

1. Motoboys e entregadores de moto.
2. Motoristas de aplicativo.
3. Entregadores de bicicleta/e-bike.

## Proposta de valor

> A KORRE Loja ajuda quem trabalha na rua a encontrar equipamentos úteis, seguros e compatíveis com sua rotina, sem perder tempo pesquisando em dezenas de anúncios.

## Jornada principal do usuário

```txt
Usuário acessa pelo celular
↓
Escolhe veículo: carro, moto ou bicicleta
↓
Escolhe problema: chuva, energia, segurança, organização etc.
↓
Vê produtos curados e comparativos
↓
Clica em Ver preço no marketplace
↓
Backend registra clique
↓
Usuário compra no marketplace parceiro
```

## Jornada administrativa

```txt
Admin abre app desktop
↓
Faz login
↓
Cadastra produto
↓
Adiciona oferta/link afiliado
↓
Define categoria, veículo, tags e critérios
↓
Publica no site
↓
Acompanha cliques e desempenho
↓
Revisa ranking e destaques
```

## Categorias iniciais

### Alta prioridade

- Suportes de celular.
- Carregadores veiculares.
- Cabos reforçados.
- Power banks.
- Proteção contra chuva.
- Capacetes certificados.
- Iluminação.
- Refletivos.
- Bags e mochilas térmicas.
- Organizadores.

### Média prioridade

- Câmeras veiculares.
- Intercomunicadores.
- Ferramentas simples.
- Kits de reparo.
- Roupas térmicas.
- Luvas.
- Proteção solar.
- Conforto.

### Posterior

- Peças complexas.
- Pneus.
- Baterias.
- Produtos que exigem instalação.
- Produtos com compatibilidade avançada.

## Requisitos funcionais do site

### Home

- Hero com escolha por veículo.
- Busca por produto ou problema.
- Atalhos para mais procurados.
- Kits por rotina.
- Ofertas verificadas.
- Guias e comparativos.
- Aviso de afiliado.

### Listagem de produtos

- Filtro por veículo.
- Filtro por categoria.
- Filtro por problema.
- Filtro por marketplace.
- Filtro por faixa de preço.
- Cards com CTA externo.

### Página de produto

- Veredito.
- Melhor para.
- Quando evitar.
- Preço de referência.
- Data da última atualização.
- Links por marketplace.
- Pontos fortes.
- Limitações.
- Compatibilidade.
- FAQ.
- Aviso de afiliado.

### Guias e comparativos

- Tabela comparativa.
- Critérios de escolha.
- Produtos por perfil.
- Perguntas frequentes.
- Dados estruturados.

## Requisitos funcionais do backend

- Auth admin.
- CRUD de produtos.
- CRUD de categorias.
- CRUD de ofertas.
- CRUD de marketplaces.
- Registro de cliques.
- Relatórios.
- Campanhas.
- Auditoria.
- Healthcheck.
- Swagger.

## Requisitos funcionais do admin desktop

- Login admin.
- Dashboard.
- Produtos.
- Categorias.
- Ofertas afiliadas.
- Campanhas.
- Cliques.
- Relatórios.
- Logs.
- Configurações.

## Requisitos não funcionais

- Site rápido no celular.
- SEO técnico preparado.
- Acessibilidade mínima.
- HTTPS.
- CORS configurado.
- Rate limit no backend.
- Logs administrativos.
- Não coletar dados pessoais sem necessidade.
- Não expor segredos no frontend.
- Links externos seguros.

## Modelo de dados mínimo

Entidades principais:

- AdminUser;
- Product;
- Category;
- Marketplace;
- AffiliateOffer;
- ClickEvent;
- Campaign;
- AuditLog;
- LegalDisclosure;
- ContentPage.

## Métricas do MVP

- cliques totais;
- cliques por produto;
- cliques por categoria;
- cliques por marketplace;
- CTR de saída;
- páginas com mais saída;
- produtos sem clique;
- links quebrados;
- campanhas com melhor desempenho.

## Critérios de aceitação

O MVP estará pronto quando:

- o site listar produtos reais com links afiliados;
- o backend registrar cliques;
- o admin cadastrar produtos e ofertas;
- o dashboard mostrar produtos mais clicados;
- o aviso de afiliado aparecer nas páginas necessárias;
- o usuário for redirecionado corretamente para o marketplace;
- não houver checkout próprio;
- a documentação estiver atualizada;
- o projeto rodar localmente com README claro.

## Riscos

| Risco | Mitigação |
|---|---|
| Produto ruim prejudicar confiança | Curadoria manual e revisão periódica |
| Preço desatualizado | Mostrar data de atualização e aviso |
| Link quebrado | Monitoramento e revisão no admin |
| Coleta excessiva de dados | Métricas anônimas e consentimento |
| Baixa conversão | Testar categorias, guias e CTAs |
| Dependência de um marketplace | Suporte futuro a múltiplos parceiros |
| Confusão sobre venda | Aviso claro de marketplace externo |

## Fases de implementação

### Fase 1 — Base técnica

- Monorepo.
- API NestJS.
- Prisma/PostgreSQL.
- Admin desktop básico.
- Site público básico.

### Fase 2 — Catálogo e cliques

- Produtos.
- Categorias.
- Ofertas.
- Links afiliados.
- Registro de cliques.

### Fase 3 — UX e SEO

- Home mobile-first.
- Páginas por veículo.
- Guias.
- Comparativos.
- Dados estruturados.

### Fase 4 — Métricas e compliance

- Dashboard.
- Relatórios.
- Aviso de afiliado.
- Cookies.
- Política de privacidade.
- Logs.

### Fase 5 — Comunidade

- WhatsApp.
- Telegram.
- Campanhas.
- Conteúdo curto.

## Decisão final do MVP

A KORRE Loja deve começar pequena, especializada e altamente curada.

Prioridade:

```txt
60 a 100 produtos bons > milhares de produtos genéricos
```

A confiança editorial será mais importante que volume de catálogo.
