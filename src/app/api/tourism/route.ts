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
      const dbItems = await prisma.tourismUMKM.findMany({
        orderBy: { createdAt: 'desc' },
      });
      if (dbItems && dbItems.length > 0) {
        items = dbItems.map((item: any) => ({
          id: item.id,
          name: item.name,
          type: item.type as 'Wisata' | 'UMKM',
          category: item.category,
          description: item.description,
          location: item.location,
          contact: item.contact || undefined,
          priceRange: item.priceRange || undefined,
          imageUrl: item.imageUrl || '/hero.jpg',
          rating: item.rating,
        }));
      }
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
