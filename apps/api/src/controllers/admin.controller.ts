import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import type { AffiliateOfferInput, CampaignInput, CategoryInput, ProductInput, StoreHubInput, WaitingRoomLinkInput } from "@korre/shared";
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
    return this.catalog.getAllCategories();
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

  @Get("offers")
  offers() {
    return this.catalog.getOffers();
  }

  @Get("waiting-room")
  waitingRoom() {
    return this.catalog.getWaitingRoomLinks();
  }

  @Post("waiting-room")
  createWaitingRoomLink(@Body() payload: WaitingRoomLinkInput) {
    return this.catalog.createWaitingRoomLink(payload);
  }

  @Patch("waiting-room/:id")
  updateWaitingRoomLink(@Param("id") id: string, @Body() payload: Partial<WaitingRoomLinkInput>) {
    return this.catalog.updateWaitingRoomLink(id, payload);
  }

  @Delete("waiting-room/:id")
  deleteWaitingRoomLink(@Param("id") id: string) {
    return this.catalog.discardWaitingRoomLink(id);
  }

  @Post("offers")
  createOffer(@Body() payload: AffiliateOfferInput) {
    return this.catalog.createOffer(payload);
  }

  @Patch("offers/:id")
  updateOffer(@Param("id") id: string, @Body() payload: Partial<AffiliateOfferInput>) {
    return this.catalog.updateOffer(id, payload);
  }

  @Delete("offers/:id")
  deleteOffer(@Param("id") id: string) {
    return this.catalog.disableOffer(id);
  }

  @Get("campaigns")
  campaigns() {
    return this.catalog.getCampaigns();
  }

  @Post("campaigns")
  createCampaign(@Body() payload: CampaignInput) {
    return this.catalog.createCampaign(payload);
  }

  @Patch("campaigns/:id")
  updateCampaign(@Param("id") id: string, @Body() payload: Partial<CampaignInput>) {
    return this.catalog.updateCampaign(id, payload);
  }

  @Delete("campaigns/:id")
  deleteCampaign(@Param("id") id: string) {
    return this.catalog.disableCampaign(id);
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
