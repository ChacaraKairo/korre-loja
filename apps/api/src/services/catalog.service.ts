import { Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import type { CategoryInput, ClickEvent, ClickPayload, Product, ProductInput } from "@korre/shared";
import { slugify } from "@korre/shared";
import { categories as seedCategories, products as seedProducts } from "../seed-data";

@Injectable()
export class CatalogService {
  private categories = [...seedCategories];
  private products = [...seedProducts];
  private clickEvents: ClickEvent[] = [];

  getPublicCatalog() {
    const activeProducts = this.getProducts({});

    return {
      categories: this.getCategories(),
      featuredProducts: activeProducts.filter((product) => product.featured),
      products: activeProducts
    };
  }

  getCategories() {
    return this.categories.filter((category) => category.active).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  getProducts(filters: { vehicle?: string; category?: string }) {
    return this.products
      .filter((product) => product.status === "active")
      .filter((product) => !filters.category || product.categorySlug === filters.category)
      .filter((product) => {
        if (!filters.vehicle || filters.vehicle === "all") {
          return true;
        }

        return product.vehicleType === filters.vehicle || product.vehicleType === "both";
      });
  }

  getAllProducts() {
    return this.products;
  }

  getProductBySlug(slug: string): Product {
    const product = this.getProducts({}).find((item) => item.slug === slug);

    if (!product) {
      throw new NotFoundException("Produto nao encontrado");
    }

    return product;
  }

  registerClick(payload: ClickPayload) {
    const product = this.products.find((item) => item.id === payload.productId);
    const category = this.categories.find((item) => item.id === payload.categoryId);

    if (!product) {
      throw new NotFoundException("Produto nao encontrado");
    }

    const event = {
      ...payload,
      id: randomUUID(),
      productName: product.name,
      categoryName: category?.name,
      createdAt: new Date().toISOString()
    };

    this.clickEvents.push(event);

    return {
      ok: true,
      clickId: event.id,
      redirectUrl: product.offer?.affiliateUrl
    };
  }

  getAdminDashboard() {
    const activeProducts = this.products.filter((product) => product.status === "active");
    const productsWithoutOffer = activeProducts.filter((product) => !product.offer?.active).length;
    const topProduct = this.getTopProducts().sort((a, b) => b.clicks - a.clicks)[0];

    return {
      activeProducts: activeProducts.length,
      activeCategories: this.getCategories().length,
      clicksToday: this.clickEvents.length,
      clicksLastSevenDays: this.clickEvents.length,
      topProductName: topProduct?.clicks ? topProduct.product.name : "Sem cliques ainda",
      topCategoryName: this.categories[0]?.name ?? "Sem categoria",
      activeCampaigns: 1,
      productsWithoutOffer
    };
  }

  createProduct(payload: ProductInput) {
    const category = this.categories.find((item) => item.id === payload.categoryId);

    if (!category) {
      throw new NotFoundException("Categoria nao encontrada");
    }

    const product: Product = {
      id: randomUUID(),
      categoryId: category.id,
      categorySlug: category.slug,
      name: payload.name,
      slug: slugify(payload.name),
      shortDescription: payload.shortDescription,
      recommendationReason: payload.recommendationReason,
      vehicleType: payload.vehicleType,
      audience: payload.audience,
      imageUrl:
        payload.imageUrl ||
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
      referencePriceCents: payload.referencePriceCents,
      currency: "BRL",
      status: "active",
      featured: Boolean(payload.featured),
      tags: payload.tags ?? [],
      bestFor: payload.bestFor,
      avoidWhen: payload.avoidWhen,
      offer: payload.affiliateUrl
        ? {
            id: randomUUID(),
            provider: "mercado_livre",
            affiliateUrl: payload.affiliateUrl,
            active: true,
            referencePriceCents: payload.referencePriceCents,
            updatedAt: new Date().toISOString()
          }
        : undefined
    };

    this.products.unshift(product);
    return product;
  }

  updateProduct(id: string, payload: Partial<ProductInput> & { status?: string; featured?: boolean }) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index < 0) {
      throw new NotFoundException("Produto nao encontrado");
    }

    const category = payload.categoryId ? this.categories.find((item) => item.id === payload.categoryId) : undefined;
    const current = this.products[index];
    const updated: Product = {
      ...current,
      ...payload,
      status: (payload.status as Product["status"]) ?? current.status,
      categoryId: category?.id ?? current.categoryId,
      categorySlug: category?.slug ?? current.categorySlug,
      slug: payload.name ? slugify(payload.name) : current.slug,
      tags: payload.tags ?? current.tags,
      imageUrl: payload.imageUrl ?? current.imageUrl,
      referencePriceCents: payload.referencePriceCents ?? current.referencePriceCents,
      offer: payload.affiliateUrl
        ? {
            id: current.offer?.id ?? randomUUID(),
            provider: "mercado_livre",
            affiliateUrl: payload.affiliateUrl,
            active: true,
            referencePriceCents: payload.referencePriceCents ?? current.referencePriceCents,
            updatedAt: new Date().toISOString()
          }
        : current.offer
    };

    this.products[index] = updated;
    return updated;
  }

  archiveProduct(id: string) {
    return this.updateProduct(id, { status: "archived" });
  }

  createCategory(payload: CategoryInput) {
    const category = {
      id: randomUUID(),
      name: payload.name,
      slug: payload.slug ? slugify(payload.slug) : slugify(payload.name),
      description: payload.description,
      icon: payload.icon,
      sortOrder: payload.sortOrder ?? this.categories.length + 1,
      active: payload.active ?? true
    };

    this.categories.push(category);
    return category;
  }

  updateCategory(id: string, payload: Partial<CategoryInput>) {
    const index = this.categories.findIndex((category) => category.id === id);

    if (index < 0) {
      throw new NotFoundException("Categoria nao encontrada");
    }

    this.categories[index] = {
      ...this.categories[index],
      ...payload,
      slug: payload.slug ? slugify(payload.slug) : this.categories[index].slug
    };

    return this.categories[index];
  }

  disableCategory(id: string) {
    return this.updateCategory(id, { active: false });
  }

  getClicks() {
    return [...this.clickEvents].reverse();
  }

  getTopProducts() {
    const counts = new Map<string, number>();

    for (const click of this.clickEvents) {
      counts.set(click.productId, (counts.get(click.productId) ?? 0) + 1);
    }

    return this.products.map((product) => ({
      product,
      clicks: counts.get(product.id) ?? 0
    }));
  }
}
