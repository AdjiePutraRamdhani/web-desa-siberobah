import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getNewsBySlugStore, deleteNewsStore } from '@/lib/newsStore';

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    if (prisma) {
      try {
        const article = await prisma.news.findUnique({
          where: { slug },
        });

        if (article) {
          return NextResponse.json({ success: true, data: article });
        }
      } catch (e) {
        // Fall back to memory
      }
    }

    const fallback = getNewsBySlugStore(slug);
    if (fallback) {
      return NextResponse.json({ success: true, data: fallback });
    }

    return NextResponse.json({ success: false, message: 'Berita tidak ditemukan' }, { status: 404 });
  } catch (error) {
    const fallback = getNewsBySlugStore(slug);
    if (fallback) {
      return NextResponse.json({ success: true, data: fallback, isFallback: true });
    }
    return NextResponse.json({ success: false, message: 'Berita tidak ditemukan' }, { status: 404 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    let deleted = false;
    if (prisma) {
      try {
        await prisma.news.delete({
          where: { slug },
        });
        deleted = true;
      } catch (dbErr) {
        deleted = deleteNewsStore(slug);
      }
    } else {
      deleted = deleteNewsStore(slug);
    }

    return NextResponse.json({
      success: true,
      message: 'Berita berhasil dihapus.',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus berita.' },
      { status: 500 }
    );
  }
}
