import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import type { CategoryInput, ProductInput, StoreHubInput } from "@korre/shared";
import { AuthGuard } from "../common/auth.guard";
import { CatalogService } from "../services/catalog.service";

@Controller("admin")
@UseGuards(AuthGuard)
export class AdminController {
  constructor(private readonly catalog: CatalogService) {}

  @Get("dashboard")
  dashboard() {
    return this.catalog.getAdminDashboard();
  }

  @Get("products")
  products() {
    return this.catalog.getAllProducts();
  }

  @Post("products")
  createProduct(@Body() payload: ProductInput) {
    return this.catalog.createProduct(payload);
  }

  @Patch("products/:id")
  updateProduct(@Param("id") id: string, @Body() payload: Partial<ProductInput> & { status?: string; featured?: boolean }) {
    return this.catalog.updateProduct(id, payload);
  }

  @Delete("products/:id")
  deleteProduct(@Param("id") id: string) {
    return this.catalog.archiveProduct(id);
  }

  @Get("categories")
  categories() {
    return this.catalog.getCategories();
  }

  @Post("categories")
  createCategory(@Body() payload: CategoryInput) {
    return this.catalog.createCategory(payload);
  }

  @Patch("categories/:id")
  updateCategory(@Param("id") id: string, @Body() payload: Partial<CategoryInput>) {
    return this.catalog.updateCategory(id, payload);
  }

  @Delete("categories/:id")
  deleteCategory(@Param("id") id: string) {
    return this.catalog.disableCategory(id);
  }

  @Get("hubs")
  hubs() {
    return this.catalog.getAllHubs();
  }

  @Post("hubs")
  createHub(@Body() payload: StoreHubInput) {
    return this.catalog.createHub(payload);
  }

  @Patch("hubs/:id")
  updateHub(@Param("id") id: string, @Body() payload: Partial<StoreHubInput>) {
    return this.catalog.updateHub(id, payload);
  }

  @Delete("hubs/:id")
  deleteHub(@Param("id") id: string) {
    return this.catalog.disableHub(id);
  }

  @Get("clicks")
  clicks() {
    return this.catalog.getClicks();
  }

  @Get("reports/top-products")
  topProducts() {
    return this.catalog.getTopProducts();
  }
}
