import type { Category, Product } from "@korre/shared";

export const categories: Category[] = [
  {
    id: "cat-suportes",
    name: "Celular e suporte",
    slug: "celular-e-suporte",
    description: "Suportes, bases e acessorios para manter o celular visivel e seguro.",
    icon: "phone",
    sortOrder: 1,
    active: true
  },
  {
    id: "cat-energia",
    name: "Energia na rua",
    slug: "energia-na-rua",
    description: "Carregadores, cabos reforcados e power banks para longas jornadas.",
    icon: "battery",
    sortOrder: 2,
    active: true
  },
  {
    id: "cat-chuva",
    name: "Chuva e protecao",
    slug: "chuva-e-protecao",
    description: "Itens para trabalhar com mais seguranca em dias de chuva.",
    icon: "cloud-rain",
    sortOrder: 3,
    active: true
  }
];

export const products: Product[] = [
  {
    id: "prod-suporte-celular",
    categoryId: "cat-suportes",
    categorySlug: "celular-e-suporte",
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
    tags: ["gps", "carro", "rotina"],
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
    categoryId: "cat-energia",
    categorySlug: "energia-na-rua",
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
    tags: ["energia", "usb-c", "carga"],
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
    categoryId: "cat-chuva",
    categorySlug: "chuva-e-protecao",
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
    tags: ["moto", "chuva", "entrega"],
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
];
