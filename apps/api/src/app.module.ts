import { Module } from "@nestjs/common";
import { AdminController } from "./controllers/admin.controller";
import { AuthController } from "./controllers/auth.controller";
import { PublicController } from "./controllers/public.controller";
import { AuthService } from "./services/auth.service";
import { CatalogService } from "./services/catalog.service";
import { PrismaService } from "./services/prisma.service";

@Module({
  controllers: [PublicController, AdminController, AuthController],
  providers: [CatalogService, AuthService, PrismaService]
})
export class AppModule {}
