import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { updateSubmissionStatusStore, deleteSubmissionStore } from '@/lib/submissionStore';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { success: false, message: 'Status wajib ditentukan.' },
        { status: 400 }
      );
    }

    let updated;
    if (prisma) {
      try {
        updated = await prisma.serviceSubmission.update({
          where: { id },
          data: { status },
        });
      } catch (dbErr) {
        updated = updateSubmissionStatusStore(id, status);
      }
    } else {
      updated = updateSubmissionStatusStore(id, status);
    }

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Pengajuan tidak ditemukan.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Status pengajuan berhasil diperbarui.',
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui status pengajuan.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let deleted = false;

    if (prisma) {
      try {
        await prisma.serviceSubmission.delete({
          where: { id },
        });
        deleted = true;
      } catch (dbErr) {
        deleted = deleteSubmissionStore(id);
      }
    } else {
      deleted = deleteSubmissionStore(id);
    }

    return NextResponse.json({
      success: true,
      message: 'Pengajuan berhasil dihapus.',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus pengajuan.' },
      { status: 500 }
    );
  }
}
