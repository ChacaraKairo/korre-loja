import { Module } from "@nestjs/common";
import { AdminController } from "./controllers/admin.controller";
import { PublicController } from "./controllers/public.controller";
import { CatalogService } from "./services/catalog.service";

@Module({
  controllers: [PublicController, AdminController],
  providers: [CatalogService]
})
export class AppModule {}
