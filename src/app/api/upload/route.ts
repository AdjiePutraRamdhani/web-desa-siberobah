import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'File gambar wajib diunggah.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // If Cloudinary API credentials exist in environment variables, upload to Cloudinary CDN
    if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      return new Promise<NextResponse>((resolve) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'siberobah-news' },
          (error, result) => {
            if (error || !result) {
              // Fall back to Data URL
              const base64 = buffer.toString('base64');
              const dataUrl = `data:${file.type};base64,${base64}`;
              resolve(NextResponse.json({ success: true, url: dataUrl }));
            } else {
              resolve(NextResponse.json({ success: true, url: result.secure_url }));
            }
          }
        );
        uploadStream.end(buffer);
      });
    }

    // Default deployment fallback: Convert file buffer to Data URL
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    return NextResponse.json({
      success: true,
      message: 'Gambar berhasil diunggah.',
      url: dataUrl,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal memproses unggahan gambar.' },
      { status: 500 }
    );
  }
}
