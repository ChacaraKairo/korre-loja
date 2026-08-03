import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BatteryCharging,
  Bike,
  ChevronDown,
  Car,
  ChevronRight,
  ClipboardList,
  CloudRain,
  ExternalLink,
  Menu,
  PackageSearch,
  Search,
  Smartphone,
  Zap
} from "lucide-react";
import type { Product, PublicCatalog, VehicleType } from "@korre/shared";
import { affiliateDisclosure, formatPrice } from "@korre/shared";
import "./styles.css";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

const fallbackCatalog: PublicCatalog = {
  categories: [
    {
      id: "cat-trabalho-produtividade",
      name: "Trabalho e produtividade",
      slug: "trabalho-e-produtividade",
      subcategories: ["Suportes para celular", "Carregadores", "Cabos", "Power banks", "Atendimento ao passageiro", "Gestao da jornada"],
      sortOrder: 1,
      active: true
    },
    {
      id: "cat-tecnologia",
      name: "Tecnologia e eletronicos",
      slug: "tecnologia-e-eletronicos",
      subcategories: ["Celulares", "Carregadores", "Power banks", "Dashcams", "OBD2", "Cameras de re"],
      sortOrder: 2,
      active: true
    },
    {
      id: "cat-manutencao-pecas",
      name: "Manutencao, pecas e pneus",
      slug: "manutencao-pecas-e-pneus",
      subcategories: ["Autopecas", "Freios", "Filtros", "Pneus", "Rodas", "Ferramentas"],
      sortOrder: 3,
      active: true
    },
    {
      id: "cat-limpeza-estetica",
      name: "Limpeza, higiene e estetica",
      slug: "limpeza-higiene-e-estetica",
      subcategories: ["Limpeza interna", "Limpeza externa", "Vidros", "Odores", "Polimento", "Aspiradores"],
      sortOrder: 4,
      active: true
    }
  ],
  featuredProducts: [],
  products: [],
  hubs: []
};

const driverProfiles: Array<{ label: string; value: VehicleType | "all"; icon: typeof Car }> = [
  { label: "Todos", value: "all", icon: PackageSearch },
  { label: "Carro", value: "car", icon: Car },
  { label: "Moto", value: "motorcycle", icon: Smartphone },
  { label: "Bicicleta", value: "bicycle", icon: Bike },
  { label: "Scooter eletrica", value: "electric_scooter", icon: Zap },
  { label: "Outros", value: "other", icon: Menu }
];

const kitHubs = [
  "Kit motorista de aplicativo iniciante",
  "Kit motorista cinco estrelas",
  "Kit motoboy chuva",
  "Kit celular sempre carregado",
  "Kit limpeza rapida",
  "Kit pneu e calibragem",
  "Kit trabalho noturno",
  "Kit emergencia"
];

const contentHubs = [
  { title: "Guias de compra", text: "Como escolher suporte, carregador, dashcam, compressor e mochila termica." },
  { title: "Reviews", text: "Analise de uso, pontos positivos, limitacoes, compatibilidade e alternativas." },
  { title: "Comparativos", text: "Produto contra produto, barato contra premium, marcas, tecnologias e tamanhos." },
  { title: "Manutencao", text: "Pneus, bateria, filtros, palhetas, iluminacao e sinais de desgaste." },
  { title: "Seguranca", text: "Trabalho noturno, chuva, visibilidade, cameras, passageiros e emergencia." },
  { title: "Legislacao", text: "Conteudo datado, por jurisdicao, com fontes oficiais quando for regulatorio." }
];

function App() {
  const [vehicle, setVehicle] = useState<VehicleType | "all">("all");
  const [query, setQuery] = useState("");
  const [categorySlug, setCategorySlug] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [path, setPath] = useState(window.location.pathname);
  const [catalog, setCatalog] = useState<PublicCatalog>(fallbackCatalog);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    const syncPath = () => setPath(window.location.pathname);
    window.addEventListener("popstate", syncPath);

    return () => window.removeEventListener("popstate", syncPath);
  }, []);

  useEffect(() => {
    setStatus("loading");
    fetch(`${apiUrl}/public/catalog`)
      .then((response) => response.json())
      .then((data: PublicCatalog) => {
        setCatalog(data);
        setStatus("idle");
      })
      .catch(() => {
        setStatus("error");
        setCatalog({
          ...fallbackCatalog,
          products: seedProducts,
          featuredProducts: seedProducts.filter((product) => product.featured)
        });
      });
  }, []);

  const productSlug = path.startsWith("/produto/") ? path.replace("/produto/", "") : "";
  const selectedProduct = catalog.products.find((product) => product.slug === productSlug);
  const privacyPage = path === "/privacidade-cookies";

  useEffect(() => {
    const title = privacyPage
      ? "Privacidade e cookies | Loja do Korre"
      : selectedProduct
        ? `${selectedProduct.name} | Loja do Korre`
        : "Loja do Korre | Curadoria para quem trabalha na rua";
    const description = privacyPage
      ? "Como a Loja do Korre trata cliques, cookies e dados tecnicos no MVP."
      : selectedProduct?.shortDescription ?? "Produtos curados para motoristas, motoboys e entregadores comprarem com mais criterio.";
    document.title = title;
    document.querySelector("meta[name='description']")?.setAttribute("content", description);
    document.querySelector("meta[property='og:title']")?.setAttribute("content", title);
    document.querySelector("meta[property='og:description']")?.setAttribute("content", description);
  }, [privacyPage, selectedProduct]);

  const filteredProducts = catalog.products.filter((product) => {
    const matchesVehicle = vehicle === "all" || product.vehicleType === vehicle || product.vehicleType === "both";
    const matchesCategory = categorySlug === "all" || product.categorySlug === categorySlug;
    const text = `${product.name} ${product.shortDescription} ${product.tags.join(" ")}`.toLowerCase();
    const matchesSubcategory = !selectedSubcategory || text.includes(selectedSubcategory.toLowerCase());

    return matchesVehicle && matchesCategory && matchesSubcategory && text.includes(query.toLowerCase());
  });

  const activeCategory = catalog.categories.find((category) => category.slug === categorySlug);
  const kitHubCards = catalog.hubs.filter((hub) => hub.type === "kit");
  const contentHubCards = catalog.hubs.filter((hub) => hub.type === "content");
  const seasonalHub = catalog.hubs.find((hub) => hub.type === "seasonal");

  function selectCategory(slug: string) {
    setCategorySlug((current) => current === slug && slug !== "all" ? "all" : slug);
    setSelectedSubcategory("");
  }

  function selectSubcategory(label: string) {
    setSelectedSubcategory((current) => current === label ? "" : label);
  }

  function focusHub(category: string, searchText = "") {
    setCategorySlug(category);
    setSelectedSubcategory("");
    setQuery(searchText);
    document.querySelector(".content")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function navigate(nextPath: string) {
    window.history.pushState(null, "", nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function openOffer(product: Product) {
    if (!product.offer?.active) {
      return;
    }

    await fetch(`${apiUrl}/public/clicks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
        categoryId: product.categoryId,
        source: "web-store"
      })
    }).catch(() => undefined);

    window.open(product.offer.affiliateUrl, "_blank", "noopener,noreferrer");
  }

  if (selectedProduct) {
    return (
      <main>
        <nav className="detail-topbar">
          <button onClick={() => navigate("/")}><img src="/brand/logo-sem-escrita-sem-fundo.png" alt="" /> Loja do Korre</button>
          <span>Compra fora da Loja do Korre, no marketplace parceiro</span>
        </nav>

        <section className="product-detail">
          <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
          <div>
            <p className="eyebrow">{selectedProduct.categorySlug.replaceAll("-", " ")}</p>
            <h1>{selectedProduct.name}</h1>
            <p className="hero-copy">{selectedProduct.shortDescription}</p>
            <div className="detail-price">{formatPrice(selectedProduct.referencePriceCents)}</div>
            <div className="detail-grid">
              <article>
                <strong>Veredito KORRE</strong>
                <p>{selectedProduct.recommendationReason}</p>
              </article>
              <article>
                <strong>Melhor para</strong>
                <p>{selectedProduct.bestFor}</p>
              </article>
              <article>
                <strong>Quando evitar</strong>
                <p>{selectedProduct.avoidWhen}</p>
              </article>
              <article>
                <strong>Tags</strong>
                <p>{selectedProduct.tags.join(", ") || "Curadoria geral"}</p>
              </article>
            </div>
            <div className="detail-actions">
              <button disabled={!selectedProduct.offer?.active} onClick={() => openOffer(selectedProduct)}>
                Ver preco no Mercado Livre <ExternalLink size={16} />
              </button>
              <button className="secondary-action" onClick={() => navigate("/")}>Voltar para vitrine</button>
            </div>
            <p className="legal-copy">{affiliateDisclosure}</p>
          </div>
        </section>
      </main>
    );
  }

  if (privacyPage) {
    return (
      <main>
        <nav className="detail-topbar">
          <button onClick={() => navigate("/")}><img src="/brand/logo-sem-escrita-sem-fundo.png" alt="" /> Loja do Korre</button>
          <span>Privacidade e cookies</span>
        </nav>

        <section className="policy-page">
          <p className="eyebrow">Transparencia</p>
          <h1>Privacidade e cookies</h1>
          <p>
            No MVP, a Loja do Korre registra cliques de saida e dados tecnicos minimos para medir interesse nos produtos.
            Nao processamos pagamento, entrega ou dados sensiveis de compra.
          </p>
          <article>
            <h2>Dados que podemos registrar</h2>
            <p>
              Podemos armazenar produto clicado, categoria, origem do clique, campanha e data do evento. Esses dados ajudam
              a entender quais recomendacoes sao uteis e quais areas da vitrine precisam melhorar.
            </p>
          </article>
          <article>
            <h2>Cookies e tecnologias similares</h2>
            <p>
              A loja pode usar recursos tecnicos do navegador e parametros de campanha para manter a experiencia funcionando
              e medir desempenho. A compra acontece fora da Loja do Korre, no marketplace parceiro.
            </p>
          </article>
          <article>
            <h2>Links de afiliado</h2>
            <p>{affiliateDisclosure}</p>
          </article>
          <button className="secondary-action" onClick={() => navigate("/")}>Voltar para vitrine</button>
        </section>
      </main>
    );
  }

  return (
    <main>
      <header className="market-header">
        <div className="market-top">
          <button className="brand" onClick={() => navigate("/")}>
            <img src="/brand/logo-completa-sem-fundo.png" alt="Loja do Korre" />
          </button>
          <div className="market-search">
            <Search size={20} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar produtos, marcas e mais" />
            <button>Buscar</button>
          </div>
          <span className="header-note">Compra segura no marketplace parceiro</span>
        </div>
      </header>

      <section className="market-hero">
        <div>
          <p className="eyebrow">Marketplace afiliado do ecossistema KORRE</p>
          <h1>Produtos para quem roda, entrega e precisa manter a operacao funcionando.</h1>
          <p>
            Uma vitrine curada no estilo marketplace, separada por perfil, veiculo, problema, contexto de uso
            e solucao recomendada para quem vive na correria.
          </p>
          <div className="formula-strip" aria-label="Logica de recomendacao">
            {["Perfil profissional", "Veiculo", "Problema", "Contexto", "Solucao"].map((step) => (
              <span key={step}>{step}</span>
            ))}
          </div>
        </div>
        <img src="/brand/logo-completa-sem-fundo.png" alt="Loja do Korre" />
      </section>

      <section className="driver-section">
        <div className="section-heading compact-heading">
          <div>
            <p className="eyebrow">Comece pelo seu perfil</p>
            <h2>Tipo de motorista</h2>
          </div>
        </div>
        <div className="driver-grid">
          {driverProfiles.map((profile) => {
            const Icon = profile.icon;
            return (
              <button className={vehicle === profile.value ? "active" : ""} key={profile.value} onClick={() => setVehicle(profile.value)}>
                <Icon size={22} />
                {profile.label}
              </button>
            );
          })}
        </div>
      </section>

      {status === "error" && <p className="notice">Nao foi possivel carregar a API agora. Exibindo catalogo local de partida.</p>}

      <section className="content catalog-layout">
        <div className="catalog-main">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Ofertas e recomendacoes</p>
              <h2>{selectedSubcategory || activeCategory?.name || "Produtos para sua rotina"}</h2>
            </div>
            <span>{filteredProducts.length} itens ativos</span>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <img src={product.imageUrl} alt={product.name} />
                <div className="product-body">
                  <div className="product-meta">
                    <span>{product.categorySlug.replaceAll("-", " ")}</span>
                    {product.featured && <strong>Destaque</strong>}
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.recommendationReason}</p>
                  <dl>
                    <div>
                      <dt>Melhor para</dt>
                      <dd>{product.bestFor}</dd>
                    </div>
                    <div>
                      <dt>Cuidados</dt>
                      <dd>{product.avoidWhen}</dd>
                    </div>
                  </dl>
                  <div className="card-footer">
                    <strong>{formatPrice(product.referencePriceCents)}</strong>
                    <div className="card-actions">
                      <button className="secondary-action" onClick={() => navigate(`/produto/${product.slug}`)}>Ver detalhes</button>
                      <button disabled={!product.offer?.active} onClick={() => openOffer(product)}>
                        Mercado Livre <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="filter-sidebar" aria-label="Filtros">
          <div className="filter-heading">
            <p className="eyebrow">Filtros</p>
            <h2>Categorias</h2>
          </div>
          <button className={categorySlug === "all" ? "active" : ""} onClick={() => selectCategory("all")}>
            Todas <ChevronRight size={16} />
          </button>
          {catalog.categories.map((category) => (
            <div className="filter-category" key={category.id}>
              <button className={categorySlug === category.slug ? "active" : ""} onClick={() => selectCategory(category.slug)}>
                {category.name} {categorySlug === category.slug ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              {categorySlug === category.slug && category.subcategories.length > 0 && (
                <div className="inline-subcategories">
                  {category.subcategories.map((subcategory) => (
                    <button
                      className={selectedSubcategory === subcategory ? "active" : ""}
                      key={subcategory}
                      onClick={() => selectSubcategory(subcategory)}
                    >
                      {subcategory}
                    </button>
                  ))}
                  {selectedSubcategory && <button className="clear-filter" onClick={() => setSelectedSubcategory("")}>Limpar subcategoria</button>}
                </div>
              )}
            </div>
          ))}
        </aside>
      </section>

      <section className="strategy-section split-section">
        <article>
          <div className="section-heading compact-heading">
            <div>
              <p className="eyebrow">Kits completos</p>
              <h2>Combos por profissao, problema e jornada</h2>
            </div>
          </div>
          <div className="kit-list">
            {(kitHubCards.length ? kitHubCards : kitHubs.map((title) => ({ title, categorySlug: "kits-loja-do-korre", query: title.replace("Kit ", "") }))).map((kit) => (
              <button key={kit.title} onClick={() => focusHub(kit.categorySlug ?? "kits-loja-do-korre", kit.query)}>
                <PackageSearch size={18} />
                {kit.title}
              </button>
            ))}
          </div>
        </article>

        <article>
          <div className="section-heading compact-heading">
            <div>
              <p className="eyebrow">Clima e sazonalidade</p>
              <h2>Prioridades da rotina</h2>
            </div>
          </div>
          <div className="season-card">
            <CloudRain size={28} />
            <strong>{seasonalHub?.title ?? "Chuva, calor, frio, ferias e datas profissionais"}</strong>
            <p>{seasonalHub?.subtitle ?? "Campanhas podem destacar capas, impermeabilizacao, hidratacao, ventilacao, viagem, presentes e kits por faixa de preco."}</p>
            <button onClick={() => focusHub(seasonalHub?.categorySlug ?? "seguranca-clima-e-emergencia", seasonalHub?.query ?? "chuva")}>Ver itens de clima</button>
          </div>
        </article>
      </section>

      <section className="strategy-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Conteudo especializado</p>
            <h2>Guias, reviews e comparativos</h2>
          </div>
        </div>
        <div className="content-hub-grid">
          {(contentHubCards.length ? contentHubCards : contentHubs).map((hub) => (
            <article key={hub.title}>
              <ClipboardList size={20} />
              <h3>{hub.title}</h3>
              <p>{"text" in hub ? hub.text : hub.subtitle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="affiliate">
        <BatteryCharging size={22} />
        <p>{affiliateDisclosure}</p>
        <button className="privacy-link" onClick={() => navigate("/privacidade-cookies")}>Privacidade e cookies</button>
        <img src="/brand/escrita-loja-do-korre-sem-fundo.png" alt="Loja do Korre" />
      </section>
    </main>
  );
}

const seedProducts: Product[] = [
  {
    id: "prod-demo",
    categoryId: "cat-trabalho-produtividade",
    categorySlug: "trabalho-e-produtividade",
    name: "Suporte veicular com trava reforcada",
    slug: "suporte-veicular-trava-reforcada",
    shortDescription: "Boa opcao para GPS diario.",
    recommendationReason: "Mantem o aparelho firme e reduz improvisos durante a jornada.",
    vehicleType: "car",
    audience: "driver",
    imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=900&q=80",
    referencePriceCents: 6990,
    currency: "BRL",
    status: "active",
    featured: true,
    tags: ["suportes para celular", "gps", "carro"],
    bestFor: "Motoristas de app.",
    avoidWhen: "Painel sem area firme.",
    offer: {
      id: "offer-demo",
      provider: "mercado_livre",
      affiliateUrl: "https://www.mercadolivre.com.br/",
      active: true,
      referencePriceCents: 6990,
      updatedAt: new Date().toISOString()
    }
  }
];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
