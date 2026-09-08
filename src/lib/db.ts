import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

let prismaInstance: PrismaClient | null = null;

try {
  const globalForPrisma = global as unknown as { prisma?: PrismaClient };

  if (globalForPrisma.prisma) {
    prismaInstance = globalForPrisma.prisma;
  } else {
    const rawUrl = process.env.DATABASE_URL || 'mysql://root:@localhost:3306/siberobah_db';
    
    // Parse DATABASE_URL: mysql://user:password@host:port/database
    const parsed = new URL(rawUrl.replace('mysql://', 'http://'));
    const host = parsed.hostname || 'localhost';
    const port = parsed.port ? parseInt(parsed.port, 10) : 3306;
    const user = parsed.username ? decodeURIComponent(parsed.username) : 'root';
    const password = parsed.password ? decodeURIComponent(parsed.password) : '';
    const database = parsed.pathname ? parsed.pathname.replace(/^\//, '') : 'siberobah_db';

    const adapter = new PrismaMariaDb({
      host,
      port,
      user,
      password,
      database,
      connectionLimit: 10,
    });

    prismaInstance = new PrismaClient({ adapter });

    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prismaInstance;
    }
  }
} catch (e) {
  console.error('Failed to initialize PrismaClient with MySQL adapter:', e);
  prismaInstance = null;
}

export const prisma = prismaInstance;
