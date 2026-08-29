import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSubmissionsStore, addSubmissionStore } from '@/lib/submissionStore';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  try {
    let items = [];
    if (prisma) {
      items = await prisma.serviceSubmission.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }

    if (!items || items.length === 0) {
      items = getSubmissionsStore();
    }

    if (status && status !== 'Semua') {
      items = items.filter((item: any) => item.status.toLowerCase() === status.toLowerCase());
    }

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    let items = getSubmissionsStore();
    if (status && status !== 'Semua') {
      items = items.filter((item: any) => item.status.toLowerCase() === status.toLowerCase());
    }
    return NextResponse.json({ success: true, data: items });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { serviceTitle, name, nik, phone, purpose } = body;

    if (!serviceTitle || !name || !nik || !phone || !purpose) {
      return NextResponse.json(
        { success: false, message: 'Semua bidang formulir wajib diisi.' },
        { status: 400 }
      );
    }

    let createdItem;
    if (prisma) {
      try {
        createdItem = await prisma.serviceSubmission.create({
          data: {
            serviceTitle,
            name,
            nik,
            phone,
            purpose,
            status: 'Pending',
          },
        });
      } catch (dbErr) {
        createdItem = addSubmissionStore({ serviceTitle, name, nik, phone, purpose });
      }
    } else {
      createdItem = addSubmissionStore({ serviceTitle, name, nik, phone, purpose });
    }

    return NextResponse.json({
      success: true,
      message: 'Pengajuan surat berhasil terkirim!',
      data: createdItem,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal memproses pengajuan surat.' },
      { status: 500 }
    );
  }
}
