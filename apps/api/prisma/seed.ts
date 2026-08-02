import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { categories, products } from "../src/seed-data";
import { initDatabase } from "./init";

const prisma = new PrismaClient();

async function main() {
  await initDatabase(prisma);

  const adminEmail = process.env.ADMIN_SEED_EMAIL ?? "admin@korre.local";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD ?? "change-me";

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      name: "Admin KORRE",
      active: true
    },
    create: {
      name: "Admin KORRE",
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 12),
      role: "admin",
      active: true
    }
  });

  await prisma.category.updateMany({
    where: {
      slug: {
        notIn: categories.map((category) => category.slug)
      }
    },
    data: {
      active: false
    }
  });

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        icon: category.icon,
        sortOrder: category.sortOrder,
        active: category.active
      },
      create: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
        sortOrder: category.sortOrder,
        active: category.active
      }
    });
  }

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        categoryId: product.categoryId,
        shortDescription: product.shortDescription,
        recommendationReason: product.recommendationReason,
        vehicleType: product.vehicleType,
        audience: product.audience,
        imageUrl: product.imageUrl,
        referencePriceCents: product.referencePriceCents,
        currency: product.currency,
        status: product.status,
        featured: product.featured,
        tagsJson: JSON.stringify(product.tags),
        description: JSON.stringify({
          bestFor: product.bestFor,
          avoidWhen: product.avoidWhen
        })
      },
      create: {
        id: product.id,
        categoryId: product.categoryId,
        name: product.name,
        slug: product.slug,
        shortDescription: product.shortDescription,
        recommendationReason: product.recommendationReason,
        vehicleType: product.vehicleType,
        audience: product.audience,
        imageUrl: product.imageUrl,
        referencePriceCents: product.referencePriceCents,
        currency: product.currency,
        status: product.status,
        featured: product.featured,
        tagsJson: JSON.stringify(product.tags),
        description: JSON.stringify({
          bestFor: product.bestFor,
          avoidWhen: product.avoidWhen
        })
      }
    });

    if (product.offer) {
      await prisma.affiliateLink.upsert({
        where: { id: product.offer.id },
        update: {
          productId: product.id,
          provider: product.offer.provider,
          originalUrl: product.offer.affiliateUrl,
          affiliateUrl: product.offer.affiliateUrl,
          active: product.offer.active
        },
        create: {
          id: product.offer.id,
          productId: product.id,
          provider: product.offer.provider,
          originalUrl: product.offer.affiliateUrl,
          affiliateUrl: product.offer.affiliateUrl,
          active: product.offer.active
        }
      });
    }
  }

  await prisma.campaign.upsert({
    where: { slug: "mvp-lancamento" },
    update: {
      active: true
    },
    create: {
      name: "MVP Lancamento",
      slug: "mvp-lancamento",
      description: "Campanha inicial da Loja do Korre",
      utmSource: "korre",
      utmMedium: "site",
      utmCampaign: "mvp-lancamento",
      active: true
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
