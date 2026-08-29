import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { INITIAL_NEWS, NewsItem } from '@/lib/data';

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    if (prisma) {
      const article = await prisma.news.findUnique({
        where: { slug },
      });

      if (article) {
        return NextResponse.json({ success: true, data: article });
      }
    }

    const fallback = INITIAL_NEWS.find((item: NewsItem) => item.slug === slug);
    if (fallback) {
      return NextResponse.json({ success: true, data: fallback });
    }

    return NextResponse.json({ success: false, message: 'Article not found' }, { status: 404 });
  } catch (error) {
    const fallback = INITIAL_NEWS.find((item: NewsItem) => item.slug === slug);
    if (fallback) {
      return NextResponse.json({ success: true, data: fallback, isFallback: true });
    }
    return NextResponse.json({ success: false, message: 'Article not found' }, { status: 404 });
  }
}
