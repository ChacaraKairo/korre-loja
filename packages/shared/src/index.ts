export type VehicleType = "car" | "motorcycle" | "bicycle" | "electric_scooter" | "other" | "both";

export type ProductStatus = "draft" | "active" | "inactive" | "archived";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  subcategories: string[];
  sortOrder: number;
  active: boolean;
};

export type AffiliateOffer = {
  id: string;
  productId?: string;
  productName?: string;
  provider: "mercado_livre" | "other";
  affiliateUrl: string;
  active: boolean;
  referencePriceCents?: number;
  updatedAt: string;
};

export type AffiliateOfferInput = {
  productId: string;
  provider?: "mercado_livre" | "other";
  originalUrl?: string;
  affiliateUrl: string;
  active?: boolean;
  notes?: string;
};

export type Product = {
  id: string;
  categoryId: string;
  categorySlug: string;
  name: string;
  slug: string;
  shortDescription: string;
  recommendationReason: string;
  vehicleType: VehicleType;
  audience: "driver" | "motoboy" | "delivery" | "general";
  imageUrl: string;
  referencePriceCents?: number;
  currency: "BRL";
  status: ProductStatus;
  featured: boolean;
  tags: string[];
  bestFor: string;
  avoidWhen: string;
  offer?: AffiliateOffer;
};

export type PublicCatalog = {
  categories: Category[];
  featuredProducts: Product[];
  products: Product[];
  hubs: StoreHub[];
};

export type HubType = "problem" | "objective" | "profession" | "kit" | "content" | "seasonal";

export type StoreHub = {
  id: string;
  type: HubType;
  title: string;
  slug: string;
  subtitle?: string;
  categorySlug?: string;
  query?: string;
  items: string[];
  priority: number;
  active: boolean;
};

export type StoreHubInput = {
  type: HubType;
  title: string;
  slug?: string;
  subtitle?: string;
  categorySlug?: string;
  query?: string;
  items?: string[];
  priority?: number;
  active?: boolean;
};

export type Campaign = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  startsAt?: string;
  endsAt?: string;
  active: boolean;
};

export type CampaignInput = {
  name: string;
  slug?: string;
  description?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  startsAt?: string;
  endsAt?: string;
  active?: boolean;
};

export type ClickPayload = {
  productId: string;
  categoryId?: string;
  campaignSlug?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export type ClickEvent = ClickPayload & {
  id: string;
  productName: string;
  categoryName?: string;
  createdAt: string;
};

export type ProductInput = {
  categoryId: string;
  name: string;
  shortDescription: string;
  recommendationReason: string;
  vehicleType: VehicleType;
  audience: Product["audience"];
  imageUrl?: string;
  referencePriceCents?: number;
  featured?: boolean;
  tags?: string[];
  bestFor: string;
  avoidWhen: string;
  affiliateUrl?: string;
};

export type CategoryInput = {
  name: string;
  slug?: string;
  description?: string;
  icon?: string;
  subcategories?: string[];
  sortOrder?: number;
  active?: boolean;
};

export type AdminDashboard = {
  activeProducts: number;
  activeCategories: number;
  activeHubs: number;
  clicksToday: number;
  clicksLastSevenDays: number;
  topProductName: string;
  topCategoryName: string;
  activeCampaigns: number;
  productsWithoutOffer: number;
};

export const affiliateDisclosure =
  "Alguns links da Loja do Korre podem ser links de afiliado. Podemos receber uma comissao se voce comprar pelo link, sem custo extra para voce.";

export function formatPrice(cents?: number, currency = "BRL") {
  if (!cents) {
    return "Preco a confirmar";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency
  }).format(cents / 100);
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
