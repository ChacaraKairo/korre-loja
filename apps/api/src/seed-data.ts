import type { Category, Product } from "@korre/shared";

export const categories: Category[] = [
  {
    id: "cat-eletronicos",
    name: "Eletronicos",
    slug: "eletronicos",
    description: "Celulares, carregadores, power banks, cabos e acessorios para manter a operacao conectada.",
    icon: "smartphone",
    sortOrder: 1,
    active: true
  },
  {
    id: "cat-vestimentas",
    name: "Vestimentas",
    slug: "vestimentas",
    description: "Capas de chuva, luvas, jaquetas, refletivos e protecoes para a rotina na rua.",
    icon: "shirt",
    sortOrder: 2,
    active: true
  },
  {
    id: "cat-equipamentos",
    name: "Equipamentos",
    slug: "equipamentos",
    description: "Suportes, bags, mochilas, organizadores e itens de apoio para trabalho.",
    icon: "briefcase",
    sortOrder: 3,
    active: true
  },
  {
    id: "cat-pecas",
    name: "Pecas",
    slug: "pecas",
    description: "Itens de manutencao simples e pecas de reposicao para carro, moto, bike e scooter.",
    icon: "wrench",
    sortOrder: 4,
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
    categoryId: "cat-pecas",
    categorySlug: "pecas",
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
