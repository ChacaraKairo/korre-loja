import { PrismaClient } from "@prisma/client";
import { initDatabase } from "../src/services/database-init";

if (import.meta.url === `file://${process.argv[1]}`) {
  const prisma = new PrismaClient();

  initDatabase(prisma)
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (error) => {
      console.error(error);
      await prisma.$disconnect();
      process.exit(1);
    });
}
