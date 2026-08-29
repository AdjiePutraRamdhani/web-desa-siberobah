import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Desa Siberobah - Cerdas & Mandiri | Portal Digital Resmi',
  description: 'Portal resmi Desa Siberobah. Layanan publik mandiri warga, berita & pengumuman, profil desa, serta direktori wisata dan UMKM unggulan.',
  keywords: ['Desa Siberobah', 'Portal Desa Digital', 'Smart Village', 'Layanan Publik Desa', 'UMKM Siberobah', 'Wisata Siberobah'],
  authors: [{ name: 'Pemerintah Desa Siberobah' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans bg-slate-50 text-slate-900 antialiased selection:bg-emerald-600 selection:text-white flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
