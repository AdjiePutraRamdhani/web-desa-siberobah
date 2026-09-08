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
      const dbNews = await prisma.news.findMany({
        orderBy: { createdAt: 'desc' },
      });
      if (dbNews && dbNews.length > 0) {
        news = dbNews.map((n: any) => ({
          id: n.id,
          title: n.title,
          slug: n.slug,
          content: n.content,
          snippet: n.snippet,
          category: n.category,
          imageUrl: n.imageUrl || '/hero.jpg',
          author: n.author,
          views: n.views,
          date: n.createdAt ? new Date(n.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        }));
      }
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
    console.error('Error fetching news:', error);
    return NextResponse.json({ success: false, message: 'Gagal memuat berita dari database.', data: [] }, { status: 500 });
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

    let baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    if (!baseSlug) baseSlug = `berita-${Date.now()}`;
    let slug = baseSlug;

    if (!prisma) {
      return NextResponse.json({ success: false, message: 'Koneksi database tidak tersedia.' }, { status: 500 });
    }


    // Ensure unique slug in DB if exists
    const existing = await prisma.news.findUnique({ where: { slug } });
    if (existing) {
      slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }

    const created = await prisma.news.create({
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

    return NextResponse.json({
      success: true,
      message: 'Berita baru berhasil dipublikasikan!',
      data: created,
    });
  } catch (error: any) {
    console.error('Error creating news in database:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Gagal mempublikasikan berita ke database.' },
      { status: 500 }
    );
  }
}

