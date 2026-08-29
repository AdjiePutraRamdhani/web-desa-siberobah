import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { INITIAL_NEWS, NewsItem } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const query = searchParams.get('query');

  try {
    let news: NewsItem[] = [];
    if (prisma) {
      news = await prisma.news.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }

    if (!news || news.length === 0) {
      news = INITIAL_NEWS;
    }

    if (category && category !== 'Semua') {
      news = news.filter((item: NewsItem) => item.category.toLowerCase() === category.toLowerCase());
    }

    if (query) {
      const q = query.toLowerCase();
      news = news.filter(
        (item: NewsItem) => item.title.toLowerCase().includes(q) || item.snippet.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    let filtered = INITIAL_NEWS;
    if (category && category !== 'Semua') {
      filtered = filtered.filter((item: NewsItem) => item.category.toLowerCase() === category.toLowerCase());
    }
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (item: NewsItem) => item.title.toLowerCase().includes(q) || item.snippet.toLowerCase().includes(q)
      );
    }
    return NextResponse.json({ success: true, data: filtered, isFallback: true });
  }
}
