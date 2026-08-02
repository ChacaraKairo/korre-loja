import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BatteryCharging, Bike, Car, ExternalLink, Gauge, Search, ShieldCheck, Smartphone } from "lucide-react";
import type { Product, PublicCatalog, VehicleType } from "@korre/shared";
import { affiliateDisclosure, formatPrice } from "@korre/shared";
import "./styles.css";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

const fallbackCatalog: PublicCatalog = {
  categories: [
    { id: "cat-suportes", name: "Celular e suporte", slug: "celular-e-suporte", sortOrder: 1, active: true },
    { id: "cat-energia", name: "Energia na rua", slug: "energia-na-rua", sortOrder: 2, active: true },
    { id: "cat-chuva", name: "Chuva e protecao", slug: "chuva-e-protecao", sortOrder: 3, active: true }
  ],
  featuredProducts: [],
  products: []
};

function App() {
  const [vehicle, setVehicle] = useState<VehicleType | "all">("all");
  const [query, setQuery] = useState("");
  const [categorySlug, setCategorySlug] = useState("all");
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
    const title = selectedProduct ? `${selectedProduct.name} | KORRE Loja` : "KORRE Loja | Curadoria para quem trabalha na rua";
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

    return matchesVehicle && matchesCategory && text.includes(query.toLowerCase());
  });

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
          <button onClick={() => navigate("/")}>KORRE Loja</button>
          <span>Compra fora da KORRE Loja, no marketplace parceiro</span>
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
      <section className="hero">
        <nav className="topbar">
          <strong>KORRE Loja</strong>
          <span>Curadoria para quem trabalha na rua</span>
        </nav>
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Vitrine afiliada especializada</p>
            <h1>Equipamentos uteis para rodar melhor, comprar com mais criterio e perder menos tempo.</h1>
            <p className="hero-copy">
              Produtos selecionados para motoristas, motoboys e entregadores, com foco em rotina real: energia,
              protecao, organizacao e seguranca operacional.
            </p>
            <div className="searchbar">
              <Search size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por produto ou problema" />
            </div>
          </div>
          <div className="hero-panel">
            <Gauge size={28} />
            <strong>Comece pelo seu veiculo</strong>
            <div className="vehicle-tabs">
              <button className={vehicle === "all" ? "active" : ""} onClick={() => setVehicle("all")}>Todos</button>
              <button className={vehicle === "car" ? "active" : ""} onClick={() => setVehicle("car")}><Car size={16} /> Carro</button>
              <button className={vehicle === "motorcycle" ? "active" : ""} onClick={() => setVehicle("motorcycle")}><Smartphone size={16} /> Moto</button>
              <button className={vehicle === "bicycle" ? "active" : ""} onClick={() => setVehicle("bicycle")}><Bike size={16} /> Bike</button>
            </div>
          </div>
        </div>
      </section>

      {status === "error" && <p className="notice">Nao foi possivel carregar a API agora. Exibindo catalogo local de partida.</p>}

      <section className="category-strip" aria-label="Categorias">
        <button className={categorySlug === "all" ? "active" : ""} onClick={() => setCategorySlug("all")}>
          <ShieldCheck size={16} />
          Todas
        </button>
        {catalog.categories.map((category) => (
          <button className={categorySlug === category.slug ? "active" : ""} key={category.id} onClick={() => setCategorySlug(category.slug)}>
            <ShieldCheck size={16} />
            {category.name}
          </button>
        ))}
      </section>

      <section className="content">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Produtos iniciais</p>
            <h2>Curadoria MVP</h2>
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
                    <button className="secondary-action" onClick={() => navigate(`/produto/${product.slug}`)}>Detalhes</button>
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
            No MVP, a KORRE Loja registra cliques de saida e dados tecnicos minimos para medir interesse nos produtos.
            Nao processamos pagamento, entrega ou dados sensiveis de compra.
          </p>
        </article>
        <article>
          <h2>Marketplace parceiro</h2>
          <p>
            A compra acontece fora da KORRE Loja. Preco, estoque, entrega, garantia e pos-venda sao responsabilidade
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
    categoryId: "cat-suportes",
    categorySlug: "celular-e-suporte",
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
    tags: ["gps", "carro"],
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
