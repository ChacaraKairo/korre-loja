import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BatteryCharging,
  Bike,
  ChevronDown,
  Car,
  ChevronRight,
  ExternalLink,
  Menu,
  PackageSearch,
  Search,
  ShieldCheck,
  Smartphone,
  Zap
} from "lucide-react";
import type { Product, PublicCatalog, VehicleType } from "@korre/shared";
import { affiliateDisclosure, formatPrice } from "@korre/shared";
import "./styles.css";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

const fallbackCatalog: PublicCatalog = {
  categories: [
    { id: "cat-eletronicos", name: "Eletronicos", slug: "eletronicos", sortOrder: 1, active: true },
    { id: "cat-vestimentas", name: "Vestimentas", slug: "vestimentas", sortOrder: 2, active: true },
    { id: "cat-equipamentos", name: "Equipamentos", slug: "equipamentos", sortOrder: 3, active: true },
    { id: "cat-pecas", name: "Pecas", slug: "pecas", sortOrder: 4, active: true }
  ],
  featuredProducts: [],
  products: []
};

const driverProfiles: Array<{ label: string; value: VehicleType | "all"; icon: typeof Car }> = [
  { label: "Todos", value: "all", icon: PackageSearch },
  { label: "Carro", value: "car", icon: Car },
  { label: "Moto", value: "motorcycle", icon: Smartphone },
  { label: "Bicicleta", value: "bicycle", icon: Bike },
  { label: "Scooter eletrica", value: "electric_scooter", icon: Zap },
  { label: "Outros", value: "other", icon: Menu }
];

const subcategories = [
  { label: "Celulares", category: "eletronicos" },
  { label: "Carregadores", category: "eletronicos" },
  { label: "Suportes para celular", category: "equipamentos" },
  { label: "Capas de chuva", category: "vestimentas" },
  { label: "Bags e mochilas", category: "equipamentos" },
  { label: "Pecas de revisao", category: "pecas" }
];

const subcategoriesByCategory = subcategories.reduce<Record<string, Array<{ label: string; category: string }>>>((acc, subcategory) => {
  acc[subcategory.category] = [...(acc[subcategory.category] ?? []), subcategory];
  return acc;
}, {});

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

  useEffect(() => {
    const title = selectedProduct ? `${selectedProduct.name} | Loja do Korre` : "Loja do Korre | Curadoria para quem trabalha na rua";
    const description = selectedProduct?.shortDescription ?? "Produtos curados para motoristas, motoboys e entregadores comprarem com mais criterio.";
    document.title = title;
    document.querySelector("meta[name='description']")?.setAttribute("content", description);
    document.querySelector("meta[property='og:title']")?.setAttribute("content", title);
    document.querySelector("meta[property='og:description']")?.setAttribute("content", description);
  }, [selectedProduct]);

  const filteredProducts = catalog.products.filter((product) => {
    const matchesVehicle = vehicle === "all" || product.vehicleType === vehicle || product.vehicleType === "both";
    const matchesCategory = categorySlug === "all" || product.categorySlug === categorySlug;
    const text = `${product.name} ${product.shortDescription} ${product.tags.join(" ")}`.toLowerCase();
    const matchesSubcategory = !selectedSubcategory || text.includes(selectedSubcategory.toLowerCase());

    return matchesVehicle && matchesCategory && matchesSubcategory && text.includes(query.toLowerCase());
  });

  const activeCategory = catalog.categories.find((category) => category.slug === categorySlug);
  const visibleSubcategories = categorySlug === "all" ? [] : subcategoriesByCategory[categorySlug] ?? [];
  const activeCategoryIndex = Math.max(0, catalog.categories.findIndex((category) => category.slug === categorySlug));
  const bubblePointerY = categorySlug === "all" ? 54 : 104 + activeCategoryIndex * 50;

  function selectCategory(slug: string) {
    setCategorySlug(slug);
    setSelectedSubcategory("");
  }

  function selectSubcategory(label: string) {
    setSelectedSubcategory((current) => current === label ? "" : label);
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
          <button onClick={() => navigate("/")}><img src="/brand/korre-icon.png" alt="" /> Loja do Korre</button>
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

  return (
    <main>
      <header className="market-header">
        <div className="market-top">
          <button className="brand" onClick={() => navigate("/")}>
            <img src="/brand/korre-icon.png" alt="KORRE" />
            <span>Loja do Korre</span>
          </button>
          <div className="market-search">
            <Search size={20} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar produtos, marcas e mais" />
            <button>Buscar</button>
          </div>
          <span className="header-note">Compra segura no marketplace parceiro</span>
        </div>
        <nav className="market-nav">
          <button><Menu size={16} /> Categorias</button>
          <button onClick={() => selectCategory("eletronicos")}>Eletronicos</button>
          <button onClick={() => selectCategory("vestimentas")}>Vestimentas</button>
          <button onClick={() => selectCategory("equipamentos")}>Equipamentos</button>
          <button onClick={() => selectCategory("pecas")}>Pecas</button>
        </nav>
      </header>

      <section className="market-hero">
        <div>
          <p className="eyebrow">Marketplace afiliado do ecossistema KORRE</p>
          <h1>Produtos para quem roda, entrega e precisa manter a operacao funcionando.</h1>
          <p>
            Uma vitrine curada no estilo marketplace, separada por tipo de motorista, categoria e subcategoria,
            com foco em itens uteis para a rotina na rua.
          </p>
        </div>
        <img src="/brand/korre-logo.png" alt="KORRE" />
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

      <section className="marketplace-grid">
        <aside className="category-panel">
          <strong>Categorias</strong>
          <button className={categorySlug === "all" ? "active" : ""} onClick={() => selectCategory("all")}>
            Todas <ChevronRight size={16} />
          </button>
          {catalog.categories.map((category) => (
            <div className="category-group" key={category.id}>
              <button className={categorySlug === category.slug ? "active" : ""} onClick={() => selectCategory(category.slug)}>
                {category.name} {categorySlug === category.slug ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            </div>
          ))}
        </aside>

        <section
          className={`subcategory-board ${categorySlug !== "all" ? "speech-board" : ""}`}
          style={{ "--bubble-y": `${bubblePointerY}px` } as React.CSSProperties}
          aria-label="Subcategorias"
        >
          <div className="subcategory-heading">
            <div>
              <p className="eyebrow">Subcategorias</p>
              <h2>{activeCategory ? activeCategory.name : "Escolha uma categoria"}</h2>
            </div>
            {selectedSubcategory && <button onClick={() => setSelectedSubcategory("")}>Limpar subcategoria</button>}
          </div>
          {categorySlug === "all" ? (
            <div className="category-cards">
              {catalog.categories.map((category) => (
                <button key={category.id} onClick={() => selectCategory(category.slug)}>
                  <strong>{category.name}</strong>
                  <span>{category.description ?? "Ver subcategorias"}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="subcategory-strip">
              {visibleSubcategories.map((subcategory) => (
                <button
                  className={selectedSubcategory === subcategory.label ? "active" : ""}
                  key={subcategory.label}
                  onClick={() => selectSubcategory(subcategory.label)}
                >
                  {subcategory.label}
                </button>
              ))}
            </div>
          )}
        </section>
      </section>

      <section className="content">
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
      </section>

      <section className="affiliate">
        <BatteryCharging size={22} />
        <p>{affiliateDisclosure}</p>
      </section>

      <section className="legal-section">
        <article>
          <h2>Privacidade e cookies</h2>
          <p>
            No MVP, a Loja do Korre registra cliques de saida e dados tecnicos minimos para medir interesse nos produtos.
            Nao processamos pagamento, entrega ou dados sensiveis de compra.
          </p>
        </article>
        <article>
          <h2>Marketplace parceiro</h2>
          <p>
            A compra acontece fora da Loja do Korre. Preco, estoque, entrega, garantia e pos-venda sao responsabilidade
            do marketplace e do vendedor do anuncio.
          </p>
        </article>
      </section>
    </main>
  );
}

const seedProducts: Product[] = [
  {
    id: "prod-demo",
    categoryId: "cat-equipamentos",
    categorySlug: "equipamentos",
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
