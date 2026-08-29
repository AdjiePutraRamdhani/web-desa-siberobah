import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { INITIAL_SERVICES, PublicServiceItem } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    let services: PublicServiceItem[] = [];
    if (prisma) {
      services = await prisma.publicService.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }

    if (!services || services.length === 0) {
      services = INITIAL_SERVICES;
    }

    if (category && category !== 'Semua') {
      services = services.filter((item: PublicServiceItem) => item.category.toLowerCase() === category.toLowerCase());
    }

    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    let filtered = INITIAL_SERVICES;
    if (category && category !== 'Semua') {
      filtered = filtered.filter((item: PublicServiceItem) => item.category.toLowerCase() === category.toLowerCase());
    }
    return NextResponse.json({ success: true, data: filtered, isFallback: true });
  }
}
