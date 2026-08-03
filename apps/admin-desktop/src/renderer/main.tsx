import { StrictMode, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { createRoot } from "react-dom/client";
import { BarChart3, Boxes, FolderTree, Link2, LogOut, Megaphone, Plus, Save, Settings, Tags, Trash2, type LucideIcon } from "lucide-react";
import type {
  AdminDashboard,
  AffiliateOffer,
  AffiliateOfferInput,
  Campaign,
  CampaignInput,
  Category,
  CategoryInput,
  ClickEvent,
  Product,
  ProductInput,
  StoreHub,
  StoreHubInput,
  VehicleType
} from "@korre/shared";
import "./styles.css";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";
const tokenStorageKey = "korre-loja-admin-token";

type ModuleId = "dashboard" | "products" | "categories" | "hubs" | "offers" | "reports" | "settings";

type CategoryFilterDraft = {
  id: string;
  name: string;
  slug: string;
  subcategories: string[];
};

const emptyDashboard: AdminDashboard = {
  activeProducts: 0,
  activeCategories: 0,
  activeHubs: 0,
  clicksToday: 0,
  clicksLastSevenDays: 0,
  topProductName: "API offline",
  topCategoryName: "API offline",
  activeCampaigns: 0,
  productsWithoutOffer: 0
};

function App() {
  const [token, setToken] = useState(() => localStorage.getItem(tokenStorageKey) ?? "");
  const [login, setLogin] = useState({ email: "admin@korre.local", password: "change-me" });
  const [activeModule, setActiveModule] = useState<ModuleId>("dashboard");
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [hubs, setHubs] = useState<StoreHub[]>([]);
  const [offers, setOffers] = useState<AffiliateOffer[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [clicks, setClicks] = useState<ClickEvent[]>([]);
  const [filterDrafts, setFilterDrafts] = useState<CategoryFilterDraft[]>([]);
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
  const [categoryForm, setCategoryForm] = useState<CategoryInput>({
    name: "",
    slug: "",
    description: "",
    icon: "",
    subcategories: [],
    sortOrder: 0,
    active: true
  });
  const [hubForm, setHubForm] = useState<StoreHubInput>({
    type: "problem",
    title: "",
    subtitle: "",
    categorySlug: "",
    query: "",
    items: [],
    priority: 0,
    active: true
  });
  const [offerForm, setOfferForm] = useState<AffiliateOfferInput>({
    productId: "",
    provider: "mercado_livre",
    affiliateUrl: "",
    active: true
  });
  const [campaignForm, setCampaignForm] = useState<CampaignInput>({
    name: "",
    slug: "",
    description: "",
    utmSource: "korre",
    utmMedium: "desktop",
    utmCampaign: "",
    active: true
  });

  const activeCategories = useMemo(() => categories.filter((category) => category.active), [categories]);

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
      adminFetch("/admin/hubs").then((response) => response.json()),
      adminFetch("/admin/offers").then((response) => response.json()),
      adminFetch("/admin/campaigns").then((response) => response.json()),
      adminFetch("/admin/clicks").then((response) => response.json())
    ])
      .then(([dashboardData, productData, categoryData, hubData, offerData, campaignData, clickData]) => {
        setDashboard(dashboardData);
        setProducts(productData);
        setCategories(categoryData);
        setHubs(hubData);
        setOffers(offerData);
        setCampaigns(campaignData);
        setClicks(clickData);
        setFilterDrafts(
          categoryData.map((category: Category) => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
            subcategories: category.subcategories
          }))
        );
        setForm((current) => ({ ...current, categoryId: current.categoryId || categoryData[0]?.id || "" }));
        setOfferForm((current) => ({ ...current, productId: current.productId || productData[0]?.id || "" }));
      })
      .catch(() => setDashboard(emptyDashboard));
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
    setHubs([]);
    setOffers([]);
    setCampaigns([]);
    setClicks([]);
    setFilterDrafts([]);
  }

  async function createProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("Salvando produto...");
    const response = await adminFetch("/admin/products", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        referencePriceCents: form.referencePriceCents ? Number(form.referencePriceCents) : undefined,
        tags: Array.isArray(form.tags) ? form.tags : String(form.tags).split(",").map((tag) => tag.trim()).filter(Boolean)
      })
    });

    if (!response.ok) {
      setFeedback("Nao foi possivel salvar o produto.");
      return;
    }

    setFeedback("Produto cadastrado.");
    setForm((current) => ({ ...current, name: "", shortDescription: "", recommendationReason: "", bestFor: "", avoidWhen: "", affiliateUrl: "", imageUrl: "", tags: [] }));
    await loadAdminData();
  }

  async function updateProductStatus(product: Product, status: Product["status"]) {
    setFeedback(`Atualizando ${product.name}...`);
    const response = await adminFetch(`/admin/products/${product.id}`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      setFeedback("Nao foi possivel atualizar o produto.");
      return;
    }

    setFeedback("Produto atualizado.");
    await loadAdminData();
  }

  async function createCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("Salvando categoria...");
    const response = await adminFetch("/admin/categories", {
      method: "POST",
      body: JSON.stringify(categoryForm)
    });

    if (!response.ok) {
      setFeedback("Nao foi possivel salvar a categoria.");
      return;
    }

    setFeedback("Categoria cadastrada.");
    setCategoryForm({ name: "", slug: "", description: "", icon: "", subcategories: [], sortOrder: 0, active: true });
    await loadAdminData();
  }

  async function toggleCategory(category: Category) {
    const response = await adminFetch(`/admin/categories/${category.id}`, {
      method: "PATCH",
      body: JSON.stringify({ active: !category.active })
    });
    setFeedback(response.ok ? "Categoria atualizada." : "Nao foi possivel atualizar a categoria.");
    await loadAdminData();
  }

  async function syncCategoryFromDraft(category: CategoryFilterDraft) {
    const response = await adminFetch(`/admin/categories/${category.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: category.name,
        slug: category.slug,
        subcategories: category.subcategories.map((item) => item.trim()).filter(Boolean)
      })
    });
    setFeedback(response.ok ? "Categoria sincronizada com o backend." : "Nao foi possivel sincronizar a categoria.");
    await loadAdminData();
  }

  async function createHub(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("Salvando hub...");
    const response = await adminFetch("/admin/hubs", {
      method: "POST",
      body: JSON.stringify({
        ...hubForm,
        items: Array.isArray(hubForm.items) ? hubForm.items : String(hubForm.items).split(",").map((item) => item.trim()).filter(Boolean),
        priority: hubForm.priority ? Number(hubForm.priority) : 0
      })
    });

    if (!response.ok) {
      setFeedback("Nao foi possivel salvar o hub.");
      return;
    }

    setFeedback("Hub cadastrado.");
    setHubForm((current) => ({ ...current, title: "", subtitle: "", query: "", items: [] }));
    await loadAdminData();
  }

  async function toggleHub(hub: StoreHub) {
    const response = await adminFetch(`/admin/hubs/${hub.id}`, {
      method: "PATCH",
      body: JSON.stringify({ active: !hub.active })
    });
    setFeedback(response.ok ? "Hub atualizado." : "Nao foi possivel atualizar o hub.");
    await loadAdminData();
  }

  async function createOffer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("Salvando oferta...");
    const response = await adminFetch("/admin/offers", {
      method: "POST",
      body: JSON.stringify(offerForm)
    });

    if (!response.ok) {
      setFeedback("Nao foi possivel salvar a oferta.");
      return;
    }

    setFeedback("Oferta cadastrada.");
    setOfferForm((current) => ({ ...current, affiliateUrl: "" }));
    await loadAdminData();
  }

  async function toggleOffer(offer: AffiliateOffer) {
    const response = await adminFetch(`/admin/offers/${offer.id}`, {
      method: "PATCH",
      body: JSON.stringify({ active: !offer.active })
    });
    setFeedback(response.ok ? "Oferta atualizada." : "Nao foi possivel atualizar a oferta.");
    await loadAdminData();
  }

  async function createCampaign(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("Salvando campanha...");
    const response = await adminFetch("/admin/campaigns", {
      method: "POST",
      body: JSON.stringify(campaignForm)
    });

    if (!response.ok) {
      setFeedback("Nao foi possivel salvar a campanha.");
      return;
    }

    setFeedback("Campanha cadastrada.");
    setCampaignForm((current) => ({ ...current, name: "", slug: "", description: "", utmCampaign: "" }));
    await loadAdminData();
  }

  async function toggleCampaign(campaign: Campaign) {
    const response = await adminFetch(`/admin/campaigns/${campaign.id}`, {
      method: "PATCH",
      body: JSON.stringify({ active: !campaign.active })
    });
    setFeedback(response.ok ? "Campanha atualizada." : "Nao foi possivel atualizar a campanha.");
    await loadAdminData();
  }

  function updateFilterDraft(index: number, patch: Partial<CategoryFilterDraft>) {
    setFilterDrafts((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item));
  }

  function updateFilterSubcategory(categoryIndex: number, subcategoryIndex: number, value: string) {
    setFilterDrafts((current) =>
      current.map((category, itemIndex) =>
        itemIndex === categoryIndex
          ? { ...category, subcategories: category.subcategories.map((subcategory, innerIndex) => innerIndex === subcategoryIndex ? value : subcategory) }
          : category
      )
    );
  }

  function addFilterSubcategory(categoryIndex: number) {
    setFilterDrafts((current) => current.map((category, itemIndex) => itemIndex === categoryIndex ? { ...category, subcategories: [...category.subcategories, "Nova subcategoria"] } : category));
  }

  function removeFilterSubcategory(categoryIndex: number, subcategoryIndex: number) {
    setFilterDrafts((current) =>
      current.map((category, itemIndex) =>
        itemIndex === categoryIndex ? { ...category, subcategories: category.subcategories.filter((_, innerIndex) => innerIndex !== subcategoryIndex) } : category
      )
    );
  }

  function addFilterCategory() {
    setFilterDrafts((current) => [...current, { id: `cat-local-${Date.now()}`, name: "Nova categoria", slug: "nova-categoria", subcategories: ["Nova subcategoria"] }]);
  }

  function removeFilterCategory(categoryIndex: number) {
    setFilterDrafts((current) => current.filter((_, itemIndex) => itemIndex !== categoryIndex));
  }

  async function saveCategoryFilterFile() {
    if (!window.korre?.saveCategoryFilters) {
      setFeedback("Gerador indisponivel neste ambiente.");
      return;
    }

    setFeedback("Gerando arquivo category-filters.ts...");
    const cleanFilters = filterDrafts.map((category) => ({
      ...category,
      subcategories: category.subcategories.map((item) => item.trim()).filter(Boolean)
    }));
    const result = await window.korre.saveCategoryFilters(cleanFilters);
    setFeedback(result.ok ? `Arquivo gerado: ${result.path}` : "Nao foi possivel gerar o arquivo.");
  }

  const stats: Array<{ label: string; value: number; Icon: LucideIcon }> = [
    { label: "Produtos ativos", value: dashboard?.activeProducts ?? 0, Icon: Boxes },
    { label: "Categorias", value: dashboard?.activeCategories ?? 0, Icon: Tags },
    { label: "Hubs ativos", value: dashboard?.activeHubs ?? 0, Icon: FolderTree },
    { label: "Campanhas", value: dashboard?.activeCampaigns ?? 0, Icon: Megaphone },
    { label: "Sem link valido", value: dashboard?.productsWithoutOffer ?? 0, Icon: Link2 }
  ];

  const modules: Array<{ id: ModuleId; label: string; Icon: LucideIcon }> = [
    { id: "dashboard", label: "Dashboard", Icon: BarChart3 },
    { id: "products", label: "Produtos", Icon: Boxes },
    { id: "categories", label: "Categorias", Icon: Tags },
    { id: "hubs", label: "Hubs", Icon: FolderTree },
    { id: "offers", label: "Ofertas", Icon: Link2 },
    { id: "reports", label: "Relatorios", Icon: BarChart3 },
    { id: "settings", label: "Configuracoes", Icon: Settings }
  ];

  if (!token) {
    return (
      <main className="login-screen">
        <form className="login-panel" onSubmit={submitLogin}>
          <strong>Loja do Korre</strong>
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
        <strong>Loja do Korre</strong>
        <nav>
          {modules.map(({ id, label, Icon }) => (
            <button key={id} className={activeModule === id ? "active" : ""} type="button" onClick={() => setActiveModule(id)}>
              <Icon size={18} /> {label}
            </button>
          ))}
        </nav>
      </aside>

      <section className="workspace">
        <header>
          <div>
            <p>Admin desktop</p>
            <h1>{modules.find((module) => module.id === activeModule)?.label}</h1>
          </div>
          <div className="header-actions">
            {feedback && <span className="feedback">{feedback}</span>}
            <button type="button" className="table-action" onClick={() => void loadAdminData()}>Atualizar</button>
            <button type="button" onClick={logout}><LogOut size={16} /> Sair</button>
          </div>
        </header>

        {activeModule === "dashboard" && (
          <div className="window">
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
                  <p>Resumo operacional</p>
                  <h2>Saude da loja</h2>
                </div>
              </div>
              <div className="summary-grid">
                <article><span>Produto mais clicado</span><strong>{dashboard?.topProductName}</strong></article>
                <article><span>Categoria mais clicada</span><strong>{dashboard?.topCategoryName}</strong></article>
                <article><span>Cliques em 7 dias</span><strong>{dashboard?.clicksLastSevenDays ?? 0}</strong></article>
              </div>
            </section>
          </div>
        )}

        {activeModule === "products" && (
          <div className="window split-window">
            <section className="panel">
              <div className="panel-heading">
                <div>
                  <p>Produtos</p>
                  <h2>Catalogo administrativo</h2>
                </div>
                <span>{products.length} produtos</span>
              </div>
              <table>
                <thead>
                  <tr><th>Produto</th><th>Categoria</th><th>Status</th><th>Oferta</th><th>Acoes</th></tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.categorySlug}</td>
                      <td>{product.status}</td>
                      <td>{product.offer?.active ? "Ativa" : "Revisar"}</td>
                      <td>
                        <button className="table-action" type="button" onClick={() => void updateProductStatus(product, product.status === "active" ? "inactive" : "active")}>
                          {product.status === "active" ? "Pausar" : "Ativar"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <form className="panel form-panel" onSubmit={createProduct}>
              <div className="panel-heading"><div><p>Cadastro</p><h2>Novo produto</h2></div></div>
              <label>Nome<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
              <label>Categoria<select required value={form.categoryId} onChange={(event) => setForm({ ...form, categoryId: event.target.value })}>{activeCategories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
              <label>Veiculo<select value={form.vehicleType} onChange={(event) => setForm({ ...form, vehicleType: event.target.value as VehicleType })}><option value="both">Todos</option><option value="car">Carro</option><option value="motorcycle">Moto</option><option value="bicycle">Bike</option><option value="electric_scooter">Scooter eletrica</option><option value="other">Outros</option></select></label>
              <label>Descricao curta<textarea required value={form.shortDescription} onChange={(event) => setForm({ ...form, shortDescription: event.target.value })} /></label>
              <label>Motivo da recomendacao<textarea required value={form.recommendationReason} onChange={(event) => setForm({ ...form, recommendationReason: event.target.value })} /></label>
              <label>Melhor para<input required value={form.bestFor} onChange={(event) => setForm({ ...form, bestFor: event.target.value })} /></label>
              <label>Quando evitar<input required value={form.avoidWhen} onChange={(event) => setForm({ ...form, avoidWhen: event.target.value })} /></label>
              <label>Link afiliado<input value={form.affiliateUrl} onChange={(event) => setForm({ ...form, affiliateUrl: event.target.value })} /></label>
              <button type="submit">Cadastrar produto</button>
            </form>
          </div>
        )}

        {activeModule === "categories" && (
          <div className="window split-window">
            <section className="panel category-builder">
              <div className="panel-heading">
                <div><p>Categorias</p><h2>Gerador de categorias e subcategorias</h2></div>
                <div className="panel-actions">
                  <button type="button" className="table-action" onClick={addFilterCategory}><Plus size={14} /> Categoria</button>
                  <button type="button" onClick={saveCategoryFilterFile}><Save size={16} /> Gerar .ts</button>
                </div>
              </div>
              <div className="category-builder-list">
                {filterDrafts.map((category, categoryIndex) => (
                  <article key={category.id} className="category-builder-card">
                    <div className="category-builder-fields">
                      <label>Categoria<input value={category.name} onChange={(event) => updateFilterDraft(categoryIndex, { name: event.target.value })} /></label>
                      <label>Slug<input value={category.slug} onChange={(event) => updateFilterDraft(categoryIndex, { slug: event.target.value })} /></label>
                    </div>
                    <div className="subcategory-editor">
                      <div className="subcategory-heading">
                        <strong>Subcategorias</strong>
                        <div className="panel-actions">
                          {!category.id.startsWith("cat-local") && <button type="button" className="table-action" onClick={() => void syncCategoryFromDraft(category)}>Salvar no back</button>}
                          <button type="button" className="table-action" onClick={() => addFilterSubcategory(categoryIndex)}><Plus size={14} /> Adicionar</button>
                          <button type="button" className="icon-action" onClick={() => removeFilterCategory(categoryIndex)} aria-label="Remover categoria"><Trash2 size={15} /></button>
                        </div>
                      </div>
                      {category.subcategories.map((subcategory, subcategoryIndex) => (
                        <div className="subcategory-row" key={`${category.id}-${subcategoryIndex}`}>
                          <input value={subcategory} onChange={(event) => updateFilterSubcategory(categoryIndex, subcategoryIndex, event.target.value)} />
                          <button type="button" className="icon-action" onClick={() => removeFilterSubcategory(categoryIndex, subcategoryIndex)} aria-label="Remover subcategoria"><Trash2 size={15} /></button>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel-stack">
              <form className="panel form-panel" onSubmit={createCategory}>
                <div className="panel-heading"><div><p>Taxonomia</p><h2>Nova categoria no back</h2></div></div>
                <label>Nome<input required value={categoryForm.name} onChange={(event) => setCategoryForm({ ...categoryForm, name: event.target.value })} /></label>
                <label>Slug<input value={categoryForm.slug} onChange={(event) => setCategoryForm({ ...categoryForm, slug: event.target.value })} /></label>
                <label>Subcategorias<input value={categoryForm.subcategories?.join(", ") ?? ""} onChange={(event) => setCategoryForm({ ...categoryForm, subcategories: event.target.value.split(",").map((item) => item.trim()).filter(Boolean) })} /></label>
                <label>Ordem<input type="number" value={categoryForm.sortOrder ?? 0} onChange={(event) => setCategoryForm({ ...categoryForm, sortOrder: Number(event.target.value) })} /></label>
                <button type="submit">Cadastrar categoria</button>
              </form>
              <section className="panel">
                <div className="panel-heading"><div><p>Status</p><h2>Categorias do backend</h2></div></div>
                <div className="click-list">
                  {categories.map((category) => (
                    <article key={category.id}>
                      <strong>{category.name}</strong>
                      <span>{category.subcategories.length} subcategorias - {category.active ? "ativa" : "inativa"}</span>
                      <button type="button" className="table-action" onClick={() => void toggleCategory(category)}>{category.active ? "Desativar" : "Ativar"}</button>
                    </article>
                  ))}
                </div>
              </section>
            </section>
          </div>
        )}

        {activeModule === "hubs" && (
          <div className="window split-window">
            <section className="panel">
              <div className="panel-heading"><div><p>Hubs</p><h2>Blocos administraveis</h2></div><span>{hubs.length} hubs</span></div>
              <div className="click-list">
                {hubs.map((hub) => (
                  <article key={hub.id}>
                    <strong>{hub.title}</strong>
                    <span>{hub.type} - {hub.categorySlug ?? "sem categoria"} - {hub.active ? "ativo" : "inativo"}</span>
                    <button type="button" className="table-action" onClick={() => void toggleHub(hub)}>{hub.active ? "Desativar" : "Ativar"}</button>
                  </article>
                ))}
              </div>
            </section>
            <form className="panel form-panel" onSubmit={createHub}>
              <div className="panel-heading"><div><p>Taxonomia</p><h2>Novo hub</h2></div></div>
              <label>Tipo<select value={hubForm.type} onChange={(event) => setHubForm({ ...hubForm, type: event.target.value as StoreHubInput["type"] })}><option value="problem">Problema</option><option value="objective">Objetivo</option><option value="profession">Profissao</option><option value="kit">Kit</option><option value="content">Conteudo</option><option value="seasonal">Sazonal</option></select></label>
              <label>Titulo<input required value={hubForm.title} onChange={(event) => setHubForm({ ...hubForm, title: event.target.value })} /></label>
              <label>Texto de apoio<input value={hubForm.subtitle} onChange={(event) => setHubForm({ ...hubForm, subtitle: event.target.value })} /></label>
              <label>Categoria alvo<select value={hubForm.categorySlug} onChange={(event) => setHubForm({ ...hubForm, categorySlug: event.target.value })}><option value="">Sem categoria</option>{activeCategories.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}</select></label>
              <label>Busca interna<input value={hubForm.query} onChange={(event) => setHubForm({ ...hubForm, query: event.target.value })} /></label>
              <label>Itens separados por virgula<input value={Array.isArray(hubForm.items) ? hubForm.items.join(", ") : hubForm.items} onChange={(event) => setHubForm({ ...hubForm, items: event.target.value.split(",").map((item) => item.trim()).filter(Boolean) })} /></label>
              <button type="submit">Cadastrar hub</button>
            </form>
          </div>
        )}

        {activeModule === "offers" && (
          <div className="window split-window">
            <section className="panel">
              <div className="panel-heading"><div><p>Ofertas</p><h2>Links afiliados</h2></div><span>{offers.length} links</span></div>
              <table>
                <thead><tr><th>Produto</th><th>Provider</th><th>Status</th><th>Acoes</th></tr></thead>
                <tbody>{offers.map((offer) => <tr key={offer.id}><td>{offer.productName}</td><td>{offer.provider}</td><td>{offer.active ? "ativa" : "inativa"}</td><td><button type="button" className="table-action" onClick={() => void toggleOffer(offer)}>{offer.active ? "Desativar" : "Ativar"}</button></td></tr>)}</tbody>
              </table>
            </section>
            <section className="panel-stack">
              <form className="panel form-panel" onSubmit={createOffer}>
                <div className="panel-heading"><div><p>Link</p><h2>Nova oferta</h2></div></div>
                <label>Produto<select required value={offerForm.productId} onChange={(event) => setOfferForm({ ...offerForm, productId: event.target.value })}>{products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}</select></label>
                <label>Fornecedor<select value={offerForm.provider} onChange={(event) => setOfferForm({ ...offerForm, provider: event.target.value as AffiliateOfferInput["provider"] })}><option value="mercado_livre">Mercado Livre</option><option value="other">Outro</option></select></label>
                <label>URL afiliada<input required value={offerForm.affiliateUrl} onChange={(event) => setOfferForm({ ...offerForm, affiliateUrl: event.target.value })} /></label>
                <button type="submit">Cadastrar oferta</button>
              </form>
              <form className="panel form-panel" onSubmit={createCampaign}>
                <div className="panel-heading"><div><p>Campanha</p><h2>Nova campanha</h2></div></div>
                <label>Nome<input required value={campaignForm.name} onChange={(event) => setCampaignForm({ ...campaignForm, name: event.target.value })} /></label>
                <label>Slug<input value={campaignForm.slug} onChange={(event) => setCampaignForm({ ...campaignForm, slug: event.target.value })} /></label>
                <label>UTM Campaign<input value={campaignForm.utmCampaign} onChange={(event) => setCampaignForm({ ...campaignForm, utmCampaign: event.target.value })} /></label>
                <label>Descricao<textarea value={campaignForm.description} onChange={(event) => setCampaignForm({ ...campaignForm, description: event.target.value })} /></label>
                <button type="submit">Cadastrar campanha</button>
              </form>
              <section className="panel">
                <div className="panel-heading"><div><p>Campanhas</p><h2>Ativas e pausadas</h2></div></div>
                <div className="click-list">{campaigns.map((campaign) => <article key={campaign.id}><strong>{campaign.name}</strong><span>{campaign.slug} - {campaign.active ? "ativa" : "inativa"}</span><button type="button" className="table-action" onClick={() => void toggleCampaign(campaign)}>{campaign.active ? "Pausar" : "Ativar"}</button></article>)}</div>
              </section>
            </section>
          </div>
        )}

        {activeModule === "reports" && (
          <div className="window">
            <section className="panel">
              <div className="panel-heading"><div><p>Relatorios</p><h2>Saidas recentes</h2></div><span>{clicks.length} eventos</span></div>
              <div className="click-list">
                {clicks.length === 0 && <p>Nenhum clique registrado ainda.</p>}
                {clicks.map((click) => <article key={click.id}><strong>{click.productName}</strong><span>{click.categoryName ?? "Sem categoria"} - {new Date(click.createdAt).toLocaleString("pt-BR")}</span></article>)}
              </div>
            </section>
          </div>
        )}

        {activeModule === "settings" && (
          <div className="window">
            <section className="panel">
              <div className="panel-heading"><div><p>Configuracoes</p><h2>Ambiente desktop</h2></div></div>
              <div className="summary-grid">
                <article><span>API</span><strong>{apiUrl}</strong></article>
                <article><span>Plataforma</span><strong>{window.korre?.platform ?? "browser"}</strong></article>
                <article><span>Arquivo de filtros</span><strong>apps/web-store/src/category-filters.ts</strong></article>
              </div>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
