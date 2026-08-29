import { PrismaClient } from '@prisma/client';

let prismaInstance: any;

try {
  const globalForPrisma = global as unknown as { prisma: PrismaClient };
  prismaInstance =
    globalForPrisma.prisma ||
    new PrismaClient();

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance;
} catch (e) {
  prismaInstance = null;
}

export const prisma = prismaInstance;
