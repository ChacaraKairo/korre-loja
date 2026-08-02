import { StrictMode, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { createRoot } from "react-dom/client";
import { BarChart3, Boxes, Link2, LogOut, Settings, Tags, type LucideIcon } from "lucide-react";
import type { AdminDashboard, Category, ClickEvent, Product, ProductInput, VehicleType } from "@korre/shared";
import "./styles.css";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";
const tokenStorageKey = "korre-loja-admin-token";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem(tokenStorageKey) ?? "");
  const [login, setLogin] = useState({ email: "admin@korre.local", password: "change-me" });
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

  async function adminFetch(path: string, init?: RequestInit) {
    const response = await fetch(`${apiUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...init?.headers
      }
    });

    if (response.status === 401) {
      localStorage.removeItem(tokenStorageKey);
      setToken("");
      throw new Error("Sessao expirada");
    }

    return response;
  }

  async function loadAdminData() {
    return Promise.all([
      adminFetch("/admin/dashboard").then((response) => response.json()),
      adminFetch("/admin/products").then((response) => response.json()),
      adminFetch("/admin/categories").then((response) => response.json()),
      adminFetch("/admin/clicks").then((response) => response.json())
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
    if (token) {
      void loadAdminData();
    }
  }, [token]);

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("Entrando...");

    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login)
    });

    if (!response.ok) {
      setFeedback("Credenciais invalidas ou API indisponivel.");
      return;
    }

    const data = await response.json() as { token: string };
    localStorage.setItem(tokenStorageKey, data.token);
    setToken(data.token);
    setFeedback("");
  }

  function logout() {
    localStorage.removeItem(tokenStorageKey);
    setToken("");
    setDashboard(null);
    setProducts([]);
    setCategories([]);
    setClicks([]);
  }

  async function createProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("Salvando produto...");

    const payload = {
      ...form,
      referencePriceCents: form.referencePriceCents ? Number(form.referencePriceCents) : undefined,
      tags: Array.isArray(form.tags) ? form.tags : String(form.tags).split(",").map((tag) => tag.trim()).filter(Boolean)
    };

    const response = await adminFetch("/admin/products", {
      method: "POST",
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

  async function archiveProduct(product: Product) {
    setFeedback(`Arquivando ${product.name}...`);
    const response = await adminFetch(`/admin/products/${product.id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      setFeedback("Nao foi possivel arquivar o produto.");
      return;
    }

    setFeedback("Produto arquivado.");
    await loadAdminData();
  }

  const stats: Array<{ label: string; value: number; Icon: LucideIcon }> = [
    { label: "Produtos ativos", value: dashboard?.activeProducts ?? 0, Icon: Boxes },
    { label: "Categorias", value: dashboard?.activeCategories ?? 0, Icon: Tags },
    { label: "Cliques hoje", value: dashboard?.clicksToday ?? 0, Icon: BarChart3 },
    { label: "Sem link valido", value: dashboard?.productsWithoutOffer ?? 0, Icon: Link2 }
  ];

  if (!token) {
    return (
      <main className="login-screen">
        <form className="login-panel" onSubmit={submitLogin}>
          <strong>KORRE Loja</strong>
          <div>
            <p>Admin desktop</p>
            <h1>Acesse a gestao da vitrine</h1>
          </div>
          <label>
            E-mail
            <input type="email" required value={login.email} onChange={(event) => setLogin({ ...login, email: event.target.value })} />
          </label>
          <label>
            Senha
            <input type="password" required value={login.password} onChange={(event) => setLogin({ ...login, password: event.target.value })} />
          </label>
          <button type="submit">Entrar</button>
          {feedback && <span className="feedback">{feedback}</span>}
        </form>
      </main>
    );
  }

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
          <button onClick={logout}><LogOut size={16} /> Sair</button>
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
                <th>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.categorySlug}</td>
                  <td>{product.status}</td>
                  <td>{product.offer?.active ? "Ativa" : "Revisar"}</td>
                  <td>
                    {product.status !== "archived" && (
                      <button className="table-action" onClick={() => archiveProduct(product)}>Arquivar</button>
                    )}
                  </td>
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
