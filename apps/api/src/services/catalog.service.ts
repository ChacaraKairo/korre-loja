import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import type { AffiliateLink, Category as DbCategory, Product as DbProduct, StoreHub as DbStoreHub } from "@prisma/client";
import type { Category, CategoryInput, ClickPayload, Product, ProductInput, ProductStatus, StoreHub, StoreHubInput, VehicleType } from "@korre/shared";
import { slugify } from "@korre/shared";
import { z } from "zod";
import { PrismaService } from "./prisma.service";

const vehicleTypes = ["car", "motorcycle", "bicycle", "electric_scooter", "other", "both"] as const;
const audiences = ["driver", "motoboy", "delivery", "general"] as const;
const productStatuses = ["draft", "active", "inactive", "archived"] as const;
const hubTypes = ["problem", "objective", "profession", "kit", "content", "seasonal"] as const;

const productSchema = z.object({
  categoryId: z.string().min(1),
  name: z.string().min(3),
  shortDescription: z.string().min(3),
  recommendationReason: z.string().min(3),
  vehicleType: z.enum(vehicleTypes),
  audience: z.enum(audiences),
  imageUrl: z.string().url().optional().or(z.literal("")),
  referencePriceCents: z.coerce.number().int().positive().optional(),
  featured: z.coerce.boolean().optional(),
  tags: z.array(z.string()).optional(),
  bestFor: z.string().min(3),
  avoidWhen: z.string().min(3),
  affiliateUrl: z.string().url().optional().or(z.literal(""))
});

const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  subcategories: z.array(z.string()).optional(),
  sortOrder: z.coerce.number().int().optional(),
  active: z.coerce.boolean().optional()
});

const hubSchema = z.object({
  type: z.enum(hubTypes),
  title: z.string().min(2),
  slug: z.string().optional(),
  subtitle: z.string().optional(),
  categorySlug: z.string().optional(),
  query: z.string().optional(),
  items: z.array(z.string()).optional(),
  priority: z.coerce.number().int().optional(),
  active: z.coerce.boolean().optional()
});

const clickSchema = z.object({
  productId: z.string().min(1),
  categoryId: z.string().optional(),
  campaignSlug: z.string().optional(),
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional()
});

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  async getPublicCatalog() {
    const [categories, products, hubs] = await Promise.all([this.getCategories(), this.getProducts({}), this.getHubs()]);

    return {
      categories,
      featuredProducts: products.filter((product) => product.featured),
      products,
      hubs
    };
  }

  async getHubs(type?: string) {
    const hubs = await this.prisma.storeHub.findMany({
      where: {
        active: true,
        type: type && hubTypes.includes(type as StoreHub["type"]) ? type : undefined
      },
      orderBy: [{ type: "asc" }, { priority: "asc" }, { title: "asc" }]
    });

    return hubs.map((hub) => this.mapHub(hub));
  }

  async getAllHubs() {
    const hubs = await this.prisma.storeHub.findMany({
      orderBy: [{ type: "asc" }, { priority: "asc" }, { title: "asc" }]
    });

    return hubs.map((hub) => this.mapHub(hub));
  }

  async getCategories() {
    const categories = await this.prisma.category.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }]
    });

    return categories.map((category) => this.mapCategory(category));
  }

  async getProducts(filters: { vehicle?: string; category?: string }) {
    const products = await this.prisma.product.findMany({
      where: {
        status: "active",
        category: filters.category ? { slug: filters.category } : undefined,
        OR:
          filters.vehicle && filters.vehicle !== "all"
            ? [{ vehicleType: filters.vehicle }, { vehicleType: "both" }]
            : undefined
      },
      include: {
        category: true,
        affiliateLinks: {
          where: { active: true },
          orderBy: { updatedAt: "desc" },
          take: 1
        }
      },
      orderBy: [{ featured: "desc" }, { updatedAt: "desc" }]
    });

    return products.map((product) => this.mapProduct(product));
  }

  async getAllProducts() {
    const products = await this.prisma.product.findMany({
      include: {
        category: true,
        affiliateLinks: {
          orderBy: { updatedAt: "desc" },
          take: 1
        }
      },
      orderBy: { updatedAt: "desc" }
    });

    return products.map((product) => this.mapProduct(product));
  }

  async getProductBySlug(slug: string): Promise<Product> {
    const product = await this.prisma.product.findFirst({
      where: { slug, status: "active" },
      include: {
        category: true,
        affiliateLinks: {
          where: { active: true },
          orderBy: { updatedAt: "desc" },
          take: 1
        }
      }
    });

    if (!product) {
      throw new NotFoundException("Produto nao encontrado");
    }

    return this.mapProduct(product);
  }

  async registerClick(payload: ClickPayload) {
    const input = this.parse(clickSchema, payload);
    const product = await this.prisma.product.findUnique({
      where: { id: input.productId },
      include: {
        category: true,
        affiliateLinks: {
          where: { active: true },
          orderBy: { updatedAt: "desc" },
          take: 1
        }
      }
    });

    if (!product) {
      throw new NotFoundException("Produto nao encontrado");
    }

    const campaign = input.campaignSlug
      ? await this.prisma.campaign.findUnique({ where: { slug: input.campaignSlug } })
      : null;

    const click = await this.prisma.productClick.create({
      data: {
        productId: product.id,
        categoryId: input.categoryId ?? product.categoryId,
        campaignId: campaign?.id,
        source: input.source,
        utmSource: input.utmSource,
        utmMedium: input.utmMedium,
        utmCampaign: input.utmCampaign
      }
    });

    return {
      ok: true,
      clickId: click.id,
      redirectUrl: product.affiliateLinks[0]?.affiliateUrl
    };
  }

  async getAdminDashboard() {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    const [activeProducts, activeCategories, activeHubs, clicksToday, clicksLastSevenDays, allProducts, topProducts] =
      await Promise.all([
        this.prisma.product.count({ where: { status: "active" } }),
        this.prisma.category.count({ where: { active: true } }),
        this.prisma.storeHub.count({ where: { active: true } }),
        this.prisma.productClick.count({ where: { createdAt: { gte: startOfToday } } }),
        this.prisma.productClick.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
        this.prisma.product.findMany({
          where: { status: "active" },
          include: { affiliateLinks: { where: { active: true }, take: 1 } }
        }),
        this.getTopProducts()
      ]);

    return {
      activeProducts,
      activeCategories,
      activeHubs,
      clicksToday,
      clicksLastSevenDays,
      topProductName: topProducts[0]?.clicks ? topProducts[0].product.name : "Sem cliques ainda",
      topCategoryName: await this.getTopCategoryName(),
      activeCampaigns: await this.prisma.campaign.count({ where: { active: true } }),
      productsWithoutOffer: allProducts.filter((product) => product.affiliateLinks.length === 0).length
    };
  }

  async createProduct(payload: ProductInput) {
    const input = this.parse(productSchema, payload);
    const category = await this.prisma.category.findUnique({ where: { id: input.categoryId } });

    if (!category) {
      throw new NotFoundException("Categoria nao encontrada");
    }

    const product = await this.prisma.product.create({
      data: {
        categoryId: category.id,
        name: input.name,
        slug: await this.uniqueProductSlug(input.name),
        shortDescription: input.shortDescription,
        recommendationReason: input.recommendationReason,
        vehicleType: input.vehicleType,
        audience: input.audience,
        imageUrl:
          input.imageUrl ||
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
        referencePriceCents: input.referencePriceCents,
        status: "active",
        featured: Boolean(input.featured),
        tagsJson: JSON.stringify(input.tags ?? []),
        description: JSON.stringify({
          bestFor: input.bestFor,
          avoidWhen: input.avoidWhen
        }),
        affiliateLinks: input.affiliateUrl
          ? {
              create: {
                provider: "mercado_livre",
                originalUrl: input.affiliateUrl,
                affiliateUrl: input.affiliateUrl,
                active: true
              }
            }
          : undefined
      },
      include: {
        category: true,
        affiliateLinks: { orderBy: { updatedAt: "desc" }, take: 1 }
      }
    });

    return this.mapProduct(product);
  }

  async updateProduct(id: string, payload: Partial<ProductInput> & { status?: string; featured?: boolean }) {
    const current = await this.prisma.product.findUnique({
      where: { id },
      include: { affiliateLinks: { orderBy: { updatedAt: "desc" }, take: 1 } }
    });

    if (!current) {
      throw new NotFoundException("Produto nao encontrado");
    }

    const product = await this.prisma.product.update({
      where: { id },
      data: {
        categoryId: payload.categoryId,
        name: payload.name,
        slug: payload.name ? await this.uniqueProductSlug(payload.name, id) : undefined,
        shortDescription: payload.shortDescription,
        recommendationReason: payload.recommendationReason,
        vehicleType: payload.vehicleType,
        audience: payload.audience,
        imageUrl: payload.imageUrl,
        referencePriceCents: payload.referencePriceCents,
        featured: payload.featured,
        status: productStatuses.includes(payload.status as ProductStatus) ? payload.status : undefined,
        tagsJson: payload.tags ? JSON.stringify(payload.tags) : undefined,
        description:
          payload.bestFor || payload.avoidWhen
            ? JSON.stringify({
                bestFor: payload.bestFor ?? this.readDescription(current.description).bestFor,
                avoidWhen: payload.avoidWhen ?? this.readDescription(current.description).avoidWhen
              })
            : undefined,
        affiliateLinks: payload.affiliateUrl
          ? {
              upsert: {
                where: { id: current.affiliateLinks[0]?.id ?? "new-offer" },
                update: {
                  originalUrl: payload.affiliateUrl,
                  affiliateUrl: payload.affiliateUrl,
                  active: true
                },
                create: {
                  provider: "mercado_livre",
                  originalUrl: payload.affiliateUrl,
                  affiliateUrl: payload.affiliateUrl,
                  active: true
                }
              }
            }
          : undefined
      },
      include: {
        category: true,
        affiliateLinks: { orderBy: { updatedAt: "desc" }, take: 1 }
      }
    });

    return this.mapProduct(product);
  }

  async archiveProduct(id: string) {
    return this.updateProduct(id, { status: "archived" });
  }

  async createCategory(payload: CategoryInput) {
    const input = this.parse(categorySchema, payload);
    const category = await this.prisma.category.create({
      data: {
        name: input.name,
        slug: await this.uniqueCategorySlug(input.slug ?? input.name),
        description: input.description,
        icon: input.icon,
        subcategoriesJson: JSON.stringify(input.subcategories ?? []),
        sortOrder: input.sortOrder ?? 0,
        active: input.active ?? true
      }
    });

    return this.mapCategory(category);
  }

  async updateCategory(id: string, payload: Partial<CategoryInput>) {
    const current = await this.prisma.category.findUnique({ where: { id } });

    if (!current) {
      throw new NotFoundException("Categoria nao encontrada");
    }

    const category = await this.prisma.category.update({
      where: { id },
      data: {
        name: payload.name,
        slug: payload.slug ? await this.uniqueCategorySlug(payload.slug, id) : undefined,
        description: payload.description,
        icon: payload.icon,
        subcategoriesJson: payload.subcategories ? JSON.stringify(payload.subcategories) : undefined,
        sortOrder: payload.sortOrder,
        active: payload.active
      }
    });

    return this.mapCategory(category);
  }

  async disableCategory(id: string) {
    return this.updateCategory(id, { active: false });
  }

  async createHub(payload: StoreHubInput) {
    const input = this.parse(hubSchema, payload);
    const hub = await this.prisma.storeHub.create({
      data: {
        type: input.type,
        title: input.title,
        slug: await this.uniqueHubSlug(input.slug ?? input.title),
        subtitle: input.subtitle,
        categorySlug: input.categorySlug,
        query: input.query,
        itemsJson: JSON.stringify(input.items ?? []),
        priority: input.priority ?? 0,
        active: input.active ?? true
      }
    });

    return this.mapHub(hub);
  }

  async updateHub(id: string, payload: Partial<StoreHubInput>) {
    const current = await this.prisma.storeHub.findUnique({ where: { id } });

    if (!current) {
      throw new NotFoundException("Hub nao encontrado");
    }

    const hub = await this.prisma.storeHub.update({
      where: { id },
      data: {
        type: payload.type,
        title: payload.title,
        slug: payload.slug ? await this.uniqueHubSlug(payload.slug, id) : undefined,
        subtitle: payload.subtitle,
        categorySlug: payload.categorySlug,
        query: payload.query,
        itemsJson: payload.items ? JSON.stringify(payload.items) : undefined,
        priority: payload.priority,
        active: payload.active
      }
    });

    return this.mapHub(hub);
  }

  async disableHub(id: string) {
    return this.updateHub(id, { active: false });
  }

  async getClicks() {
    const clicks = await this.prisma.productClick.findMany({
      include: {
        product: true,
        category: true
      },
      orderBy: { createdAt: "desc" },
      take: 250
    });

    return clicks.map((click) => ({
      id: click.id,
      productId: click.productId,
      categoryId: click.categoryId ?? undefined,
      productName: click.product.name,
      categoryName: click.category?.name,
      source: click.source ?? undefined,
      utmSource: click.utmSource ?? undefined,
      utmMedium: click.utmMedium ?? undefined,
      utmCampaign: click.utmCampaign ?? undefined,
      createdAt: click.createdAt.toISOString()
    }));
  }

  async getTopProducts() {
    const clicks = await this.prisma.productClick.groupBy({
      by: ["productId"],
      _count: { productId: true },
      orderBy: { _count: { productId: "desc" } },
      take: 20
    });
    const products = await this.prisma.product.findMany({
      where: { id: { in: clicks.map((click) => click.productId) } },
      include: {
        category: true,
        affiliateLinks: { orderBy: { updatedAt: "desc" }, take: 1 }
      }
    });

    return clicks.map((click) => ({
      product: this.mapProduct(products.find((product) => product.id === click.productId)!),
      clicks: click._count.productId
    }));
  }

  private async getTopCategoryName() {
    const topCategory = await this.prisma.productClick.groupBy({
      by: ["categoryId"],
      where: { categoryId: { not: null } },
      _count: { categoryId: true },
      orderBy: { _count: { categoryId: "desc" } },
      take: 1
    });
    const id = topCategory[0]?.categoryId;

    if (!id) {
      return "Sem cliques ainda";
    }

    return (await this.prisma.category.findUnique({ where: { id } }))?.name ?? "Sem cliques ainda";
  }

  private mapCategory(category: DbCategory): Category {
    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description ?? undefined,
      icon: category.icon ?? undefined,
      subcategories: this.readStringList(category.subcategoriesJson),
      sortOrder: category.sortOrder,
      active: category.active
    };
  }

  private mapHub(hub: DbStoreHub): StoreHub {
    return {
      id: hub.id,
      type: hub.type as StoreHub["type"],
      title: hub.title,
      slug: hub.slug,
      subtitle: hub.subtitle ?? undefined,
      categorySlug: hub.categorySlug ?? undefined,
      query: hub.query ?? undefined,
      items: this.readStringList(hub.itemsJson),
      priority: hub.priority,
      active: hub.active
    };
  }

  private mapProduct(
    product: DbProduct & {
      category: DbCategory;
      affiliateLinks: AffiliateLink[];
    }
  ): Product {
    const description = this.readDescription(product.description);
    const offer = product.affiliateLinks[0];

    return {
      id: product.id,
      categoryId: product.categoryId,
      categorySlug: product.category.slug,
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription ?? "",
      recommendationReason: product.recommendationReason ?? "",
      vehicleType: product.vehicleType as VehicleType,
      audience: product.audience as Product["audience"],
      imageUrl: product.imageUrl ?? "",
      referencePriceCents: product.referencePriceCents ?? undefined,
      currency: "BRL",
      status: product.status as ProductStatus,
      featured: product.featured,
      tags: this.readTags(product.tagsJson),
      bestFor: description.bestFor,
      avoidWhen: description.avoidWhen,
      offer: offer
        ? {
            id: offer.id,
            provider: offer.provider === "mercado_livre" ? "mercado_livre" : "other",
            affiliateUrl: offer.affiliateUrl,
            active: offer.active,
            referencePriceCents: product.referencePriceCents ?? undefined,
            updatedAt: offer.updatedAt.toISOString()
          }
        : undefined
    };
  }

  private readTags(tagsJson: string) {
    return this.readStringList(tagsJson);
  }

  private readStringList(value: string) {
    try {
      const items = JSON.parse(value);
      return Array.isArray(items) ? items.filter((item): item is string => typeof item === "string") : [];
    } catch {
      return [];
    }
  }

  private readDescription(description?: string | null) {
    try {
      const parsed = description ? JSON.parse(description) : {};

      return {
        bestFor: typeof parsed.bestFor === "string" ? parsed.bestFor : "",
        avoidWhen: typeof parsed.avoidWhen === "string" ? parsed.avoidWhen : ""
      };
    } catch {
      return {
        bestFor: "",
        avoidWhen: ""
      };
    }
  }

  private async uniqueProductSlug(value: string, currentId?: string) {
    return this.uniqueSlug(value, async (slug) => {
      const product = await this.prisma.product.findUnique({ where: { slug } });
      return !product || product.id === currentId;
    });
  }

  private async uniqueCategorySlug(value: string, currentId?: string) {
    return this.uniqueSlug(value, async (slug) => {
      const category = await this.prisma.category.findUnique({ where: { slug } });
      return !category || category.id === currentId;
    });
  }

  private async uniqueHubSlug(value: string, currentId?: string) {
    return this.uniqueSlug(value, async (slug) => {
      const hub = await this.prisma.storeHub.findUnique({ where: { slug } });
      return !hub || hub.id === currentId;
    });
  }

  private async uniqueSlug(value: string, isAvailable: (slug: string) => Promise<boolean>) {
    const base = slugify(value);
    let slug = base;
    let suffix = 2;

    while (!(await isAvailable(slug))) {
      slug = `${base}-${suffix}`;
      suffix += 1;
    }

    return slug;
  }

  private parse<T extends z.ZodType>(schema: T, payload: unknown): z.infer<T> {
    const result = schema.safeParse(payload);

    if (!result.success) {
      throw new BadRequestException(result.error.issues.map((issue) => issue.message).join("; "));
    }

    return result.data;
  }
}
