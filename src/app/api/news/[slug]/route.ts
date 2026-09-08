import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    if (!prisma) {
      return NextResponse.json({ success: false, message: 'Database tidak terhubung' }, { status: 500 });
    }

    const article = await prisma.news.findUnique({
      where: { slug },
    });

    if (article) {
      return NextResponse.json({ success: true, data: article });
    }

    return NextResponse.json({ success: false, message: 'Berita tidak ditemukan' }, { status: 404 });
  } catch (error) {
    console.error('Error finding news by slug:', error);
    return NextResponse.json({ success: false, message: 'Berita tidak ditemukan' }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    const body = await request.json();
    const { title, snippet, content, category, imageUrl, author } = body;

    if (!title || !snippet || !content) {
      return NextResponse.json(
        { success: false, message: 'Judul, Ringkasan, dan Isi Berita wajib diisi.' },
        { status: 400 }
      );
    }

    if (!prisma) {
      return NextResponse.json({ success: false, message: 'Database tidak terhubung' }, { status: 500 });
    }

    const updatedArticle = await prisma.news.update({
      where: { slug },
      data: {
        title,
        snippet,
        content,
        category: category || 'Berita',
        imageUrl: imageUrl || '/hero.jpg',
        author: author || 'Admin Desa',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Berita berhasil diperbarui!',
      data: updatedArticle,
    });
  } catch (error) {
    console.error('Error updating news in database:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan saat memperbarui berita di database.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    if (!prisma) {
      return NextResponse.json({ success: false, message: 'Database tidak terhubung' }, { status: 500 });
    }

    await prisma.news.delete({
      where: { slug },
    });

    return NextResponse.json({
      success: true,
      message: 'Berita berhasil dihapus.',
    });
  } catch (error) {
    console.error('Error deleting news in database:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus berita dari database.' },
      { status: 500 }
    );
  }
}
