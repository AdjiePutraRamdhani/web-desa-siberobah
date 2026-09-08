import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { INITIAL_SERVICES, PublicServiceItem } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    let services: PublicServiceItem[] = [];
    if (prisma) {
      const dbServices = await prisma.publicService.findMany({
        orderBy: { createdAt: 'desc' },
      });
      if (dbServices && dbServices.length > 0) {
        services = dbServices.map((s: any) => ({
          id: s.id,
          title: s.title,
          category: s.category,
          description: s.description,
          requirements: typeof s.requirements === 'string' ? s.requirements.split('\n') : s.requirements,
          processingTime: s.processingTime,
          cost: s.cost,
          icon: s.icon || 'description',
          formUrl: s.formUrl || undefined,
        }));
      }
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
