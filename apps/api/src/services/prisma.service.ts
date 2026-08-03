import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { initDatabase } from "./database-init";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await initDatabase(this);
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
