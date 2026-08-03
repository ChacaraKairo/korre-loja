import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import type { ClickPayload } from "@korre/shared";
import { CatalogService } from "../services/catalog.service";

@Controller()
export class PublicController {
  constructor(private readonly catalog: CatalogService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "korre-loja-api" };
  }

  @Get("public/catalog")
  catalogSnapshot() {
    return this.catalog.getPublicCatalog();
  }

  @Get("public/products")
  products(@Query("vehicle") vehicle?: string, @Query("category") category?: string) {
    return this.catalog.getProducts({ vehicle, category });
  }

  @Get("public/products/:slug")
  product(@Param("slug") slug: string) {
    return this.catalog.getProductBySlug(slug);
  }

  @Get("public/categories")
  categories() {
    return this.catalog.getCategories();
  }

  @Get("public/hubs")
  hubs(@Query("type") type?: string) {
    return this.catalog.getHubs(type);
  }

  @Get("public/categories/:slug/products")
  categoryProducts(@Param("slug") slug: string) {
    return this.catalog.getProducts({ category: slug });
  }

  @Post("public/clicks")
  registerClick(@Body() payload: ClickPayload) {
    return this.catalog.registerClick(payload);
  }
}
