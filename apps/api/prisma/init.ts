import { PrismaClient } from "@prisma/client";

export async function initDatabase(prisma = new PrismaClient()) {
  await prisma.$executeRawUnsafe("PRAGMA foreign_keys = ON;");

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "AdminUser" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "email" TEXT NOT NULL UNIQUE,
      "passwordHash" TEXT NOT NULL,
      "role" TEXT NOT NULL DEFAULT 'admin',
      "active" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Category" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "slug" TEXT NOT NULL UNIQUE,
      "description" TEXT,
      "icon" TEXT,
      "subcategoriesJson" TEXT NOT NULL DEFAULT '[]',
      "sortOrder" INTEGER NOT NULL DEFAULT 0,
      "active" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await prisma.$executeRawUnsafe(`ALTER TABLE "Category" ADD COLUMN "subcategoriesJson" TEXT NOT NULL DEFAULT '[]';`).catch(() => undefined);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Product" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "categoryId" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "slug" TEXT NOT NULL UNIQUE,
      "shortDescription" TEXT,
      "description" TEXT,
      "recommendationReason" TEXT,
      "vehicleType" TEXT NOT NULL DEFAULT 'both',
      "audience" TEXT NOT NULL DEFAULT 'general',
      "imageUrl" TEXT,
      "referencePriceCents" INTEGER,
      "currency" TEXT NOT NULL DEFAULT 'BRL',
      "status" TEXT NOT NULL DEFAULT 'draft',
      "featured" BOOLEAN NOT NULL DEFAULT false,
      "tagsJson" TEXT NOT NULL DEFAULT '[]',
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "AffiliateLink" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "productId" TEXT NOT NULL,
      "provider" TEXT NOT NULL DEFAULT 'mercado_livre',
      "originalUrl" TEXT NOT NULL,
      "affiliateUrl" TEXT NOT NULL,
      "active" BOOLEAN NOT NULL DEFAULT true,
      "notes" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "AffiliateLink_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Campaign" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "slug" TEXT NOT NULL UNIQUE,
      "description" TEXT,
      "utmSource" TEXT,
      "utmMedium" TEXT,
      "utmCampaign" TEXT,
      "startsAt" DATETIME,
      "endsAt" DATETIME,
      "active" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "ProductClick" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "productId" TEXT NOT NULL,
      "categoryId" TEXT,
      "campaignId" TEXT,
      "source" TEXT,
      "utmSource" TEXT,
      "utmMedium" TEXT,
      "utmCampaign" TEXT,
      "referrer" TEXT,
      "userAgentShort" TEXT,
      "ipHash" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "ProductClick_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
      CONSTRAINT "ProductClick_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
      CONSTRAINT "ProductClick_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE SET NULL ON UPDATE CASCADE
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "AuditLog" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "adminUserId" TEXT,
      "action" TEXT NOT NULL,
      "entity" TEXT,
      "entityId" TEXT,
      "detailsJson" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "AuditLog_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "AdminUser" ("id") ON DELETE SET NULL ON UPDATE CASCADE
    );
  `);

  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Product_status_idx" ON "Product" ("status");`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Product_featured_idx" ON "Product" ("featured");`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "ProductClick_productId_idx" ON "ProductClick" ("productId");`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "ProductClick_categoryId_idx" ON "ProductClick" ("categoryId");`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "ProductClick_campaignId_idx" ON "ProductClick" ("campaignId");`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "ProductClick_createdAt_idx" ON "ProductClick" ("createdAt");`);

  return prisma;
}

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
