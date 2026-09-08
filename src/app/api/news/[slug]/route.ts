import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getNewsBySlugStore, updateNewsStore, deleteNewsStore } from '@/lib/newsStore';

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

    let updatedArticle;
    if (prisma) {
      try {
        updatedArticle = await prisma.news.update({
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
        updateNewsStore(slug, {
          title,
          snippet,
          content,
          category: category || 'Berita',
          imageUrl: imageUrl || '/hero.jpg',
          author: author || 'Admin Desa',
        });
      } catch (dbErr) {
        updatedArticle = updateNewsStore(slug, {
          title,
          snippet,
          content,
          category: category || 'Berita',
          imageUrl: imageUrl || '/hero.jpg',
          author: author || 'Admin Desa',
        });
      }
    } else {
      updatedArticle = updateNewsStore(slug, {
        title,
        snippet,
        content,
        category: category || 'Berita',
        imageUrl: imageUrl || '/hero.jpg',
        author: author || 'Admin Desa',
      });
    }

    if (!updatedArticle) {
      return NextResponse.json(
        { success: false, message: 'Berita tidak ditemukan untuk diperbarui.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Berita berhasil diperbarui!',
      data: updatedArticle,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan saat memperbarui berita.' },
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

