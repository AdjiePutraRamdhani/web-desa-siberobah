import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

let prismaInstance: PrismaClient | null = null;

try {
  const globalForPrisma = global as unknown as { prisma?: PrismaClient };

  if (globalForPrisma.prisma) {
    prismaInstance = globalForPrisma.prisma;
  } else {
    const connectionString =
      process.env.DATABASE_URL ||
      'postgresql://postgres.berbhxwkmorbumxiczas:desasiberobah123@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';

    const adapter = new PrismaPg({ connectionString });
    prismaInstance = new PrismaClient({ adapter });

    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prismaInstance;
    }
  }
} catch (e) {
  console.error('Failed to initialize PrismaClient with PostgreSQL adapter:', e);
  prismaInstance = null;
}

export const prisma = prismaInstance;
