import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Default admin credentials (can be customized via environment variables)
    const validUsername = process.env.ADMIN_USERNAME || 'desakita';
    const validPassword = process.env.ADMIN_PASSWORD || 'desakita123';

    if (username === validUsername && password === validPassword) {
      // Generate a mock auth token
      const token = `token-${Date.now()}-${Math.random().toString(36).substring(2)}`;
      return NextResponse.json({
        success: true,
        message: 'Login Admin berhasil!',
        token,
        adminInfo: { name: 'Admin Balai Desa', username },
      });
    }

    return NextResponse.json(
      { success: false, message: 'Username atau Password salah.' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan sistem saat login.' },
      { status: 500 }
    );
  }
}
