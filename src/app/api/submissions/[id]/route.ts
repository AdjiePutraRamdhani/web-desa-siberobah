import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

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

    if (!prisma) {
      return NextResponse.json(
        { success: false, message: 'Database tidak terhubung.' },
        { status: 500 }
      );
    }

    const updated = await prisma.serviceSubmission.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      message: 'Status pengajuan berhasil diperbarui.',
      data: updated,
    });
  } catch (error: any) {
    console.error('Error updating submission in database:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Gagal memperbarui status pengajuan di database.' },
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

    if (!prisma) {
      return NextResponse.json(
        { success: false, message: 'Database tidak terhubung.' },
        { status: 500 }
      );
    }

    await prisma.serviceSubmission.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Pengajuan berhasil dihapus.',
    });
  } catch (error: any) {
    console.error('Error deleting submission in database:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Gagal menghapus pengajuan dari database.' },
      { status: 500 }
    );
  }
}
