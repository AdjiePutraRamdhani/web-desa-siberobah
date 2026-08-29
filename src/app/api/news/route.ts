import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getNewsStore, addNewsStore } from '@/lib/newsStore';
import { NewsItem } from '@/lib/data';

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
      news = getNewsStore();
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
    let filtered = getNewsStore();
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, snippet, content, category, imageUrl, author } = body;

    if (!title || !snippet || !content) {
      return NextResponse.json(
        { success: false, message: 'Judul, Ringkasan, dan Isi Berita wajib diisi.' },
        { status: 400 }
      );
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    let created;
    if (prisma) {
      try {
        created = await prisma.news.create({
          data: {
            title,
            slug,
            snippet,
            content,
            category: category || 'Berita',
            imageUrl: imageUrl || '/hero.jpg',
            author: author || 'Admin Desa',
          },
        });
      } catch (dbErr) {
        created = addNewsStore({ title, slug, snippet, content, category, imageUrl, author });
      }
    } else {
      created = addNewsStore({ title, slug, snippet, content, category, imageUrl, author });
    }

    return NextResponse.json({
      success: true,
      message: 'Berita baru berhasil dipublikasikan!',
      data: created,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal mempublikasikan berita.' },
      { status: 500 }
    );
  }
}
