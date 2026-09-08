import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getPageContentStore, updatePageContentStore, AllPageContents } from '@/lib/pageContentStore';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key') as keyof AllPageContents | null;

  try {
    let memory = getPageContentStore();

    if (prisma) {
      try {
        if (key) {
          const record = await (prisma as any).pageContent?.findUnique({ where: { key } });
          if (record && record.content) {
            const parsed = JSON.parse(record.content);
            updatePageContentStore(key, parsed);
            memory = getPageContentStore();
          }
        } else {
          const records = await (prisma as any).pageContent?.findMany();
          if (records && records.length > 0) {
            records.forEach((rec: any) => {
              if (rec.key && rec.content) {
                try {
                  const parsed = JSON.parse(rec.content);
                  updatePageContentStore(rec.key as keyof AllPageContents, parsed);
                } catch (e) {}
              }
            });
            memory = getPageContentStore();
          }
        }
      } catch (dbErr) {
        // Fall back to in-memory store
      }
    }

    if (key) {
      return NextResponse.json({ success: true, data: memory[key] || null });
    }

    return NextResponse.json({ success: true, data: memory });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Gagal mengambil data konten.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, content } = body as { key: keyof AllPageContents; content: any };

    if (!key || !content) {
      return NextResponse.json({ success: false, message: 'Key dan Content wajib diisi.' }, { status: 400 });
    }

    const updated = updatePageContentStore(key, content);

    if (prisma) {
      try {
        const contentStr = JSON.stringify(content);
        await (prisma as any).pageContent?.upsert({
          where: { key },
          update: { content: contentStr },
          create: { key, content: contentStr },
        });
      } catch (dbErr) {
        // Continue with memory store fallback
      }
    }

    return NextResponse.json({
      success: true,
      message: `Konten halaman "${key}" berhasil diperbarui!`,
      data: updated,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Gagal menyimpan perubahan.' }, { status: 500 });
  }
}
