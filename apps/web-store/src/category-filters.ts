export type CategoryFilter = {
  id: string;
  name: string;
  slug: string;
  subcategories: string[];
};

export const categoryFilters: CategoryFilter[] = [
  {
    id: "cat-trabalho-produtividade",
    name: "Trabalho e produtividade",
    slug: "trabalho-e-produtividade",
    subcategories: ["Suportes para celular", "Carregadores", "Cabos", "Power banks", "Atendimento ao passageiro", "Bags de entrega", "Mochilas termicas", "Gestao da jornada"]
  },
  {
    id: "cat-tecnologia",
    name: "Tecnologia e eletronicos",
    slug: "tecnologia-e-eletronicos",
    subcategories: ["Celulares", "Carregadores", "Power banks", "Cabos reforcados", "Coolers para celular", "Impressoras portateis", "Multimidia", "Dashcams", "Cameras de re", "Sensores", "OBD2", "GPS", "Conectividade", "Rastreamento", "Equipamentos inteligentes"]
  },
  {
    id: "cat-manutencao-pecas",
    name: "Manutencao, pecas e pneus",
    slug: "manutencao-pecas-e-pneus",
    subcategories: ["Autopecas", "Motor", "Filtros", "Freios", "Suspensao", "Direcao", "Correias", "Ignicao", "Arrefecimento", "Palhetas", "Eletrica", "Baterias", "Pneus de passeio", "Pneus SUV", "Pneus utilitarios", "Pneus de moto", "Pneus de bicicleta", "Rodas", "Calotas", "Kit reparo", "Compressor", "Selante", "Fluidos", "Ferramentas manuais", "Ferramentas eletricas", "Diagnostico", "Elevacao", "Consumiveis"]
  },
  {
    id: "cat-limpeza-estetica",
    name: "Limpeza, higiene e estetica",
    slug: "limpeza-higiene-e-estetica",
    subcategories: ["Limpeza interna", "Limpeza externa", "Vidros", "Estofados", "Couro", "Painel", "Rodas", "Odores", "Lavagem a seco", "Limpeza rapida", "Kits profissionais", "Protecao", "Cera", "Polimento", "Cristalizacao", "Aromatizantes", "Aspiradores", "Plastico", "Farois", "Detalhes"]
  },
  {
    id: "cat-organizacao-conforto",
    name: "Organizacao, conforto e saude",
    slug: "organizacao-conforto-e-saude",
    subcategories: ["Interior", "Porta-malas", "Banco traseiro", "Console", "Documentos", "Cabos", "Ferramentas", "Pedidos", "Alimentos", "Moto", "Bicicleta", "Viagem", "Assento e postura", "Almofadas lombares", "Apoio cervical", "Temperatura", "Hidratacao", "Alimentacao", "Garrafas termicas", "Copos termicos", "Caixas termicas", "Marmitas", "Bolsas termicas", "Protecao solar", "Primeiros socorros", "Repelentes", "Alcool em gel", "Lencos"]
  },
  {
    id: "cat-seguranca",
    name: "Seguranca, clima e emergencia",
    slug: "seguranca-clima-e-emergencia",
    subcategories: ["Visibilidade", "Registro por camera", "Monitoramento", "Pneus", "Iluminacao", "Chuva", "Calor", "Frio", "Poeira", "Lama", "Impermeabilizacao", "Emergencia", "Bateria", "Energia", "Sinalizacao", "Primeiros cuidados", "Organizacao do kit", "Protecao para moto", "Protecao para bicicleta", "Protecao de passageiros", "Protecao do veiculo"]
  },
  {
    id: "cat-moto-delivery",
    name: "Moto, vestimentas e delivery",
    slug: "moto-vestimentas-e-delivery",
    subcategories: ["Capas de chuva", "Luvas", "Jaquetas", "Refletivos", "Capacetes abertos", "Capacetes fechados", "Capacetes articulados", "Off-road", "Viseiras", "Intercomunicadores", "Celular e navegacao", "Suporte para moto", "Baus", "Bagageiros", "Mochilas", "Bags termicas", "Bags impermeaveis", "Elasticos", "Redes", "Manutencao de corrente", "Conforto para moto", "Entregas"]
  },
  {
    id: "cat-bike-mobilidade",
    name: "Bike e mobilidade leve",
    slug: "bike-e-mobilidade-leve",
    subcategories: ["Bicicletas", "Scooter eletrica", "Iluminacao", "Seguranca", "Celular", "Bolsas e transporte", "Entregas", "Hidratacao", "Conforto para bicicleta", "Manutencao de bicicleta", "Ferramentas", "Camaras", "Correntes", "Cadeados", "Bombas"]
  },
  {
    id: "cat-acessorios-viagem-servicos",
    name: "Acessorios, viagem e servicos",
    slug: "acessorios-viagem-e-servicos",
    subcategories: ["Acessorios para carro", "Interior", "Exterior", "Tapetes", "Capas", "Peliculas", "Porta-malas", "Console", "Bancos", "Volante", "Acabamento", "Bagagem", "Viagem", "Uso rodoviario", "Navegacao", "Criancas", "Animais", "Passageiros", "Porta-copos", "Protetores de banco", "Lixeiras", "Documentos", "Controle de custos", "Quilometragem", "Planejamento", "Recibos", "Pastas", "Seguro automotivo", "Rastreadores", "Assistencia 24h", "Protecao veicular"]
  },
  {
    id: "cat-kits-korre",
    name: "Kits Loja do Korre",
    slug: "kits-loja-do-korre",
    subcategories: ["Por profissao", "Por problema", "Por orcamento", "Por jornada", "Economicos", "Custo-beneficio", "Premium", "Kit chuva", "Kit noite", "Kit emergencia", "Kit delivery"]
  }
];
