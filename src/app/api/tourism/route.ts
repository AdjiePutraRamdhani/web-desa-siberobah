import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { INITIAL_WISATA_UMKM, TourismItem } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const category = searchParams.get('category');

  try {
    let items: TourismItem[] = [];
    if (prisma) {
      items = await prisma.tourismUMKM.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }

    if (!items || items.length === 0) {
      items = INITIAL_WISATA_UMKM;
    }

    if (type && type !== 'Semua') {
      items = items.filter((item: TourismItem) => item.type.toLowerCase() === type.toLowerCase());
    }

    if (category && category !== 'Semua') {
      items = items.filter((item: TourismItem) => item.category.toLowerCase() === category.toLowerCase());
    }

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    let filtered = INITIAL_WISATA_UMKM;
    if (type && type !== 'Semua') {
      filtered = filtered.filter((item: TourismItem) => item.type.toLowerCase() === type.toLowerCase());
    }
    if (category && category !== 'Semua') {
      filtered = filtered.filter((item: TourismItem) => item.category.toLowerCase() === category.toLowerCase());
    }
    return NextResponse.json({ success: true, data: filtered, isFallback: true });
  }
}
