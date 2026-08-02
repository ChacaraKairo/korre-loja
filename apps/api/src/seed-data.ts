import type { Category, Product } from "@korre/shared";

export const categories: Category[] = [
  {
    id: "cat-eletronicos",
    name: "Eletronicos",
    slug: "eletronicos",
    description: "Celulares, carregadores, power banks, cabos e acessorios para manter a operacao conectada.",
    icon: "smartphone",
    subcategories: ["Celulares", "Carregadores", "Power banks", "Cabos reforcados"],
    sortOrder: 1,
    active: true
  },
  {
    id: "cat-autopecas",
    name: "Autopecas",
    slug: "autopecas",
    description: "Pecas de reposicao e itens de manutencao preventiva ou corretiva.",
    icon: "wrench",
    subcategories: ["Oleo do motor", "Filtros", "Freios", "Suspensao", "Direcao", "Correias", "Ignicao", "Arrefecimento", "Palhetas", "Eletrica", "Baterias"],
    sortOrder: 2,
    active: true
  },
  {
    id: "cat-pneus-rodas",
    name: "Pneus e rodas",
    slug: "pneus-e-rodas",
    description: "Pneus, rodas, calotas e reparos para carro, moto, bicicleta e utilitarios.",
    icon: "circle",
    subcategories: ["Pneus de passeio", "Pneus SUV", "Pneus utilitarios", "Pneus de moto", "Pneus de bicicleta", "Rodas", "Calotas", "Kit reparo", "Compressor", "Selante"],
    sortOrder: 3,
    active: true
  },
  {
    id: "cat-ferramentas",
    name: "Ferramentas",
    slug: "ferramentas",
    description: "Ferramentas para pequenos reparos, revisoes e emergencias operacionais.",
    icon: "tool",
    subcategories: ["Kits de ferramentas", "Chaves", "Alicates", "Torquimetros", "Lanternas", "Multimetros", "Organizadores"],
    sortOrder: 4,
    active: true
  },
  {
    id: "cat-manutencao",
    name: "Manutencao",
    slug: "manutencao",
    description: "Lubrificantes, aditivos, graxas, limpeza tecnica e manutencao preventiva.",
    icon: "settings",
    subcategories: ["Lubrificantes", "Graxas", "Aditivos", "Limpeza do motor", "Higienizacao interna", "Produtos de limpeza tecnica"],
    sortOrder: 5,
    active: true
  },
  {
    id: "cat-estetica",
    name: "Estetica automotiva",
    slug: "estetica-automotiva",
    description: "Produtos para conservar, limpar e melhorar a aparencia do veiculo.",
    icon: "sparkles",
    subcategories: ["Lavagem", "Cera", "Polimento", "Cristalizacao", "Limpeza de bancos", "Limpeza de couro", "Aromatizantes", "Aspiradores"],
    sortOrder: 6,
    active: true
  },
  {
    id: "cat-organizacao",
    name: "Organizacao do veiculo",
    slug: "organizacao-do-veiculo",
    description: "Itens para manter documentos, objetos, bagagens e ferramentas no lugar.",
    icon: "archive",
    subcategories: ["Organizadores", "Porta-malas", "Porta-documentos", "Porta-moedas", "Porta-copos", "Lixeira automotiva", "Cabides"],
    sortOrder: 7,
    active: true
  },
  {
    id: "cat-seguranca",
    name: "Seguranca",
    slug: "seguranca",
    description: "Itens para emergencias, prevencao de risco e seguranca em rota.",
    icon: "shield",
    subcategories: ["Extintores", "Triangulos", "Coletes refletivos", "Cabos de bateria", "Kits de emergencia", "Lanternas", "Martelo de emergencia", "Cortador de cinto"],
    sortOrder: 8,
    active: true
  },
  {
    id: "cat-vestimentas",
    name: "Vestimentas",
    slug: "vestimentas",
    description: "Capas de chuva, luvas, jaquetas, refletivos e protecoes para a rotina na rua.",
    icon: "shirt",
    subcategories: ["Capas de chuva", "Luvas", "Jaquetas", "Refletivos"],
    sortOrder: 9,
    active: true
  },
  {
    id: "cat-capacetes",
    name: "Capacetes",
    slug: "capacetes",
    description: "Capacetes, viseiras e comunicacao para motociclistas e entregadores.",
    icon: "helmet",
    subcategories: ["Aberto", "Fechado", "Articulado", "Off-road", "Viseiras", "Intercomunicadores"],
    sortOrder: 10,
    active: true
  },
  {
    id: "cat-conforto",
    name: "Conforto",
    slug: "conforto",
    description: "Produtos para reduzir desgaste fisico em jornadas longas.",
    icon: "armchair",
    subcategories: ["Almofadas lombares", "Almofadas de pescoco", "Assentos", "Massageadores", "Ventiladores", "Aquecedores", "Capas de banco"],
    sortOrder: 11,
    active: true
  },
  {
    id: "cat-alimentacao",
    name: "Alimentacao",
    slug: "alimentacao",
    description: "Itens para agua, cafe, marmita e alimentacao durante o trabalho.",
    icon: "cup",
    subcategories: ["Garrafas termicas", "Copos termicos", "Caixas termicas", "Marmitas", "Bolsas termicas", "Cafeteiras automotivas"],
    sortOrder: 12,
    active: true
  },
  {
    id: "cat-saude-higiene",
    name: "Saude e higiene",
    slug: "saude-e-higiene",
    description: "Cuidados pessoais, primeiros socorros e higiene para a rotina na rua.",
    icon: "heart",
    subcategories: ["Primeiros socorros", "Protetor solar", "Repelentes", "Mascaras", "Alcool em gel", "Lencos", "Papel toalha", "Escova dental", "Desodorantes"],
    sortOrder: 13,
    active: true
  },
  {
    id: "cat-delivery",
    name: "Delivery",
    slug: "delivery",
    description: "Bags, baus, redes e acessorios para motoboys e entregadores.",
    icon: "package",
    subcategories: ["Mochilas", "Baus", "Bagageiros", "Elasticos", "Redes", "Capas termicas", "Bags impermeaveis"],
    sortOrder: 14,
    active: true
  },
  {
    id: "cat-bicicletas",
    name: "Bicicletas",
    slug: "bicicletas",
    description: "Equipamentos para ciclistas profissionais e entregadores de bike.",
    icon: "bike",
    subcategories: ["Capacetes", "Luzes", "Bombas", "Camaras", "Correntes", "Cadeados", "Bolsas"],
    sortOrder: 15,
    active: true
  },
  {
    id: "cat-equipamentos",
    name: "Equipamentos",
    slug: "equipamentos",
    description: "Suportes, bags, mochilas, organizadores e itens de apoio para trabalho.",
    icon: "briefcase",
    subcategories: ["Suportes para celular", "Bags e mochilas", "Organizadores", "Acessorios de apoio"],
    sortOrder: 16,
    active: true
  },
  {
    id: "cat-pecas",
    name: "Pecas",
    slug: "pecas",
    description: "Itens de manutencao simples e pecas de reposicao para carro, moto, bike e scooter.",
    icon: "wrench",
    subcategories: ["Pecas de revisao", "Freios", "Iluminacao", "Kits de reparo"],
    sortOrder: 17,
    active: false
  },
  {
    id: "cat-servicos-protecao",
    name: "Servicos e protecao",
    slug: "servicos-e-protecao",
    description: "Servicos recorrentes e protecao para quem depende do veiculo.",
    icon: "badge",
    subcategories: ["Seguro automotivo", "Rastreadores", "Assistencia 24h", "Protecao veicular"],
    sortOrder: 18,
    active: true
  },
  {
    id: "cat-acessorios-automotivos",
    name: "Acessorios automotivos",
    slug: "acessorios-automotivos",
    description: "Tapetes, peliculas, capas, adesivos e itens internos do veiculo.",
    icon: "car",
    subcategories: ["Peliculas", "Insulfilm", "Tapetes", "Capas de volante", "Descanso de braco", "Frisos", "Adesivos"],
    sortOrder: 19,
    active: true
  },
  {
    id: "cat-iluminacao",
    name: "Iluminacao",
    slug: "iluminacao",
    description: "Farois, lanternas, LEDs e sinalizacao para dirigir melhor e ser visto.",
    icon: "lightbulb",
    subcategories: ["LED", "Farois", "Lanternas", "Milhas", "Lampadas internas"],
    sortOrder: 20,
    active: true
  },
  {
    id: "cat-kits-korre",
    name: "Kits Loja do Korre",
    slug: "kits-loja-do-korre",
    description: "Combos prontos por profissao, clima, jornada e objetivo.",
    icon: "boxes",
    subcategories: ["Kit iniciante", "Kit premium", "Kit economia", "Kit chuva", "Kit noite", "Kit viagem", "Kit manutencao preventiva", "Kit longas jornadas", "Kit delivery"],
    sortOrder: 21,
    active: true
  }
];

export const products: Product[] = [
  {
    id: "prod-suporte-celular",
    categoryId: "cat-equipamentos",
    categorySlug: "equipamentos",
    name: "Suporte veicular com trava reforcada",
    slug: "suporte-veicular-trava-reforcada",
    shortDescription: "Boa opcao para quem usa GPS por horas e precisa reduzir vibracao.",
    recommendationReason: "Mantem o aparelho firme e facilita visualizar rotas sem improviso no painel.",
    vehicleType: "car",
    audience: "driver",
    imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=900&q=80",
    referencePriceCents: 6990,
    currency: "BRL",
    status: "active",
    featured: true,
    tags: ["suportes para celular", "gps", "carro", "rotina"],
    bestFor: "Motoristas de app que passam o dia alternando entre mapas, chamadas e corridas.",
    avoidWhen: "O painel do veiculo nao tem area firme para ventosa ou base adesiva.",
    offer: {
      id: "offer-suporte-celular",
      provider: "mercado_livre",
      affiliateUrl: "https://www.mercadolivre.com.br/",
      active: true,
      referencePriceCents: 6990,
      updatedAt: new Date().toISOString()
    }
  },
  {
    id: "prod-cabo-reforcado",
    categoryId: "cat-eletronicos",
    categorySlug: "eletronicos",
    name: "Cabo USB-C reforcado para carga rapida",
    slug: "cabo-usb-c-reforcado-carga-rapida",
    shortDescription: "Cabo extra para deixar no carro, moto ou mochila sem depender do principal.",
    recommendationReason: "Evita parar a operacao por bateria baixa e aguenta melhor dobra e manuseio frequente.",
    vehicleType: "both",
    audience: "general",
    imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80",
    referencePriceCents: 3990,
    currency: "BRL",
    status: "active",
    featured: true,
    tags: ["carregadores", "energia", "usb-c", "carga"],
    bestFor: "Quem alterna entre veiculo, power bank e tomada durante o dia.",
    avoidWhen: "Seu celular usa outro padrao de conector ou exige cabo certificado especifico.",
    offer: {
      id: "offer-cabo-reforcado",
      provider: "mercado_livre",
      affiliateUrl: "https://www.mercadolivre.com.br/",
      active: true,
      referencePriceCents: 3990,
      updatedAt: new Date().toISOString()
    }
  },
  {
    id: "prod-capa-chuva",
    categoryId: "cat-vestimentas",
    categorySlug: "vestimentas",
    name: "Capa de chuva para entrega",
    slug: "capa-de-chuva-para-entrega",
    shortDescription: "Camada de protecao para motoboy que nao pode parar quando o tempo vira.",
    recommendationReason: "Ajuda a manter roupa e equipamentos secos em jornadas com chuva intermitente.",
    vehicleType: "motorcycle",
    audience: "motoboy",
    imageUrl: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
    referencePriceCents: 11990,
    currency: "BRL",
    status: "active",
    featured: false,
    tags: ["capa de chuva", "moto", "chuva", "entrega"],
    bestFor: "Entregadores que rodam mesmo em periodos de chuva e precisam secar rapido.",
    avoidWhen: "Voce precisa de EPI com certificacao especifica exigida pela empresa contratante.",
    offer: {
      id: "offer-capa-chuva",
      provider: "mercado_livre",
      affiliateUrl: "https://www.mercadolivre.com.br/",
      active: true,
      referencePriceCents: 11990,
      updatedAt: new Date().toISOString()
    }
  }
  ,
  {
    id: "prod-celular-reserva",
    categoryId: "cat-eletronicos",
    categorySlug: "eletronicos",
    name: "Celular reserva para aplicativos",
    slug: "celular-reserva-para-aplicativos",
    shortDescription: "Aparelho de apoio para quem precisa manter corridas, mapas e comunicacao sempre disponiveis.",
    recommendationReason: "Ajuda a separar uso pessoal da operacao e reduz risco de ficar sem ferramenta de trabalho.",
    vehicleType: "both",
    audience: "general",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
    referencePriceCents: 79990,
    currency: "BRL",
    status: "active",
    featured: false,
    tags: ["celulares", "aplicativos", "gps"],
    bestFor: "Motoristas e entregadores que dependem do celular durante toda a jornada.",
    avoidWhen: "Voce precisa de camera premium ou alto desempenho para jogos.",
    offer: {
      id: "offer-celular-reserva",
      provider: "mercado_livre",
      affiliateUrl: "https://www.mercadolivre.com.br/",
      active: true,
      referencePriceCents: 79990,
      updatedAt: new Date().toISOString()
    }
  },
  {
    id: "prod-kit-pastilha-freio",
    categoryId: "cat-autopecas",
    categorySlug: "autopecas",
    name: "Kit de pastilhas de freio para revisao",
    slug: "kit-pastilhas-freio-revisao",
    shortDescription: "Item de manutencao preventiva para revisar antes de jornadas longas.",
    recommendationReason: "Freio em dia reduz risco operacional e evita parar de trabalhar por desgaste ignorado.",
    vehicleType: "motorcycle",
    audience: "motoboy",
    imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80",
    referencePriceCents: 8990,
    currency: "BRL",
    status: "active",
    featured: false,
    tags: ["pecas", "freio", "manutencao", "moto"],
    bestFor: "Motoboys que fazem revisao periodica e conhecem a compatibilidade da moto.",
    avoidWhen: "Voce nao tem certeza do modelo correto para seu veiculo.",
    offer: {
      id: "offer-kit-pastilha-freio",
      provider: "mercado_livre",
      affiliateUrl: "https://www.mercadolivre.com.br/",
      active: true,
      referencePriceCents: 8990,
      updatedAt: new Date().toISOString()
    }
  }
];
