import { StrictMode, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { createRoot } from "react-dom/client";
import { BarChart3, Boxes, Link2, Settings, Tags, type LucideIcon } from "lucide-react";
import type { AdminDashboard, Category, ClickEvent, Product, ProductInput, VehicleType } from "@korre/shared";
import "./styles.css";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

function App() {
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [clicks, setClicks] = useState<ClickEvent[]>([]);
  const [feedback, setFeedback] = useState("");
  const [form, setForm] = useState<ProductInput>({
    categoryId: "",
    name: "",
    shortDescription: "",
    recommendationReason: "",
    vehicleType: "both",
    audience: "general",
    bestFor: "",
    avoidWhen: "",
    affiliateUrl: "",
    tags: []
  });

  async function loadAdminData() {
    return Promise.all([
      fetch(`${apiUrl}/admin/dashboard`).then((response) => response.json()),
      fetch(`${apiUrl}/admin/products`).then((response) => response.json()),
      fetch(`${apiUrl}/admin/categories`).then((response) => response.json()),
      fetch(`${apiUrl}/admin/clicks`).then((response) => response.json())
    ])
      .then(([dashboardData, productData, categoryData, clickData]) => {
        setDashboard(dashboardData);
        setProducts(productData);
        setCategories(categoryData);
        setClicks(clickData);
        setForm((current) => ({
          ...current,
          categoryId: current.categoryId || categoryData[0]?.id || ""
        }));
      })
      .catch(() => {
        setDashboard({
          activeProducts: 0,
          activeCategories: 0,
          clicksToday: 0,
          clicksLastSevenDays: 0,
          topProductName: "API offline",
          topCategoryName: "API offline",
          activeCampaigns: 0,
          productsWithoutOffer: 0
        });
      });
  }

  useEffect(() => {
    void loadAdminData();
  }, []);

  async function createProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("Salvando produto...");

    const payload = {
      ...form,
      referencePriceCents: form.referencePriceCents ? Number(form.referencePriceCents) : undefined,
      tags: Array.isArray(form.tags) ? form.tags : String(form.tags).split(",").map((tag) => tag.trim()).filter(Boolean)
    };

    const response = await fetch(`${apiUrl}/admin/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setFeedback("Nao foi possivel salvar o produto.");
      return;
    }

    setFeedback("Produto cadastrado.");
    setForm((current) => ({
      ...current,
      name: "",
      shortDescription: "",
      recommendationReason: "",
      bestFor: "",
      avoidWhen: "",
      affiliateUrl: "",
      imageUrl: "",
      referencePriceCents: undefined,
      tags: []
    }));
    await loadAdminData();
  }

  const stats: Array<{ label: string; value: number; Icon: LucideIcon }> = [
    { label: "Produtos ativos", value: dashboard?.activeProducts ?? 0, Icon: Boxes },
    { label: "Categorias", value: dashboard?.activeCategories ?? 0, Icon: Tags },
    { label: "Cliques hoje", value: dashboard?.clicksToday ?? 0, Icon: BarChart3 },
    { label: "Sem link valido", value: dashboard?.productsWithoutOffer ?? 0, Icon: Link2 }
  ];

  return (
    <main className="shell">
      <aside>
        <strong>KORRE Loja</strong>
        <nav>
          <a className="active"><BarChart3 size={18} /> Dashboard</a>
          <a><Boxes size={18} /> Produtos</a>
          <a><Tags size={18} /> Categorias</a>
          <a><Link2 size={18} /> Ofertas</a>
          <a><Settings size={18} /> Configuracoes</a>
        </nav>
      </aside>

      <section className="workspace">
        <header>
          <div>
            <p>Admin desktop MVP</p>
            <h1>Gestao da vitrine afiliada</h1>
          </div>
          <button>Nova curadoria</button>
        </header>

        <div className="stats">
          {stats.map(({ label, value, Icon }) => (
            <article key={label}>
              <Icon size={20} />
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <p>Produtos</p>
              <h2>Fila inicial de cadastro e revisao</h2>
            </div>
            <span>{products.length} produtos</span>
          </div>

          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Status</th>
                <th>Oferta</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.categorySlug}</td>
                  <td>{product.status}</td>
                  <td>{product.offer?.active ? "Ativa" : "Revisar"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="grid-panels">
          <form className="panel form-panel" onSubmit={createProduct}>
            <div className="panel-heading">
              <div>
                <p>Cadastro rapido</p>
                <h2>Novo produto curado</h2>
              </div>
            </div>

            <label>
              Nome
              <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            </label>
            <label>
              Categoria
              <select required value={form.categoryId} onChange={(event) => setForm({ ...form, categoryId: event.target.value })}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </label>
            <label>
              Veiculo
              <select value={form.vehicleType} onChange={(event) => setForm({ ...form, vehicleType: event.target.value as VehicleType })}>
                <option value="both">Todos</option>
                <option value="car">Carro</option>
                <option value="motorcycle">Moto</option>
                <option value="bicycle">Bike</option>
              </select>
            </label>
            <label>
              Descricao curta
              <textarea required value={form.shortDescription} onChange={(event) => setForm({ ...form, shortDescription: event.target.value })} />
            </label>
            <label>
              Motivo da recomendacao
              <textarea required value={form.recommendationReason} onChange={(event) => setForm({ ...form, recommendationReason: event.target.value })} />
            </label>
            <label>
              Melhor para
              <input required value={form.bestFor} onChange={(event) => setForm({ ...form, bestFor: event.target.value })} />
            </label>
            <label>
              Quando evitar
              <input required value={form.avoidWhen} onChange={(event) => setForm({ ...form, avoidWhen: event.target.value })} />
            </label>
            <label>
              Link afiliado Mercado Livre
              <input value={form.affiliateUrl} onChange={(event) => setForm({ ...form, affiliateUrl: event.target.value })} />
            </label>
            <button type="submit">Cadastrar produto</button>
            {feedback && <span className="feedback">{feedback}</span>}
          </form>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <p>Cliques</p>
                <h2>Saidas recentes</h2>
              </div>
              <span>{clicks.length} eventos</span>
            </div>
            <div className="click-list">
              {clicks.length === 0 && <p>Nenhum clique registrado ainda.</p>}
              {clicks.map((click) => (
                <article key={click.id}>
                  <strong>{click.productName}</strong>
                  <span>{click.categoryName ?? "Sem categoria"} - {new Date(click.createdAt).toLocaleString("pt-BR")}</span>
                </article>
              ))}
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
