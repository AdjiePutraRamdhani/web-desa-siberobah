import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL || 'postgresql://postgres.berbhxwkmorbumxiczas:desasiberobah123@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres',
  },
});
