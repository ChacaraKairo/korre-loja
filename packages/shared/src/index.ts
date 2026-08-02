export type VehicleType = "car" | "motorcycle" | "bicycle" | "electric_scooter" | "other" | "both";

export type ProductStatus = "draft" | "active" | "inactive" | "archived";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  sortOrder: number;
  active: boolean;
};

export type AffiliateOffer = {
  id: string;
  provider: "mercado_livre" | "other";
  affiliateUrl: string;
  active: boolean;
  referencePriceCents?: number;
  updatedAt: string;
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
  sortOrder?: number;
  active?: boolean;
};

export type AdminDashboard = {
  activeProducts: number;
  activeCategories: number;
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
