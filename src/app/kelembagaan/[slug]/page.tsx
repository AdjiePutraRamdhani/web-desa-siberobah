import { notFound } from 'next/navigation';
import MotionWrapper from '@/components/MotionWrapper';
import Link from 'next/link';
import { ArrowLeft, Users } from 'lucide-react';
import { getPageContentStore } from '@/lib/pageContentStore';
import { prisma } from '@/lib/db';

export default async function KelembagaanDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const key = slug.toLowerCase();

  let kelembagaanStore = getPageContentStore().kelembagaan;

  if (prisma) {
    try {
      const record = await (prisma as any).pageContent?.findUnique({ where: { key: 'kelembagaan' } });
      if (record && record.content) {
        kelembagaanStore = { ...kelembagaanStore, ...JSON.parse(record.content) };
      }
    } catch (e) {}
  }

  const detail = kelembagaanStore[key];

  if (!detail) {
    notFound();
  }

  const defaultImages: Record<string, string> = {
    pemerintah: '/hero.jpg',
    bpd: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop',
    pkk: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1200&auto=format&fit=crop',
    posyandu: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    bkm: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=1200&auto=format&fit=crop',
    'karang-taruna': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop',
    lad: '/sejarah.jpg',
  };

  const imageSrc = detail.imageUrl || defaultImages[key] || '/hero.jpg';

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <section className="bg-slate-900 text-white pt-16 pb-20 px-4 md:px-10 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <MotionWrapper direction="up">
            <Link
              href="/kelembagaan"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Kelembagaan</span>
            </Link>

            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider block w-fit mb-4">
              {detail.category}
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              {detail.name}
            </h1>
            <p className="text-slate-300 text-base md:text-lg font-light max-w-2xl">
              {detail.title}
            </p>
          </MotionWrapper>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 md:px-10 py-12 space-y-10 w-full">
        {/* Gambar Lembaga */}
        <MotionWrapper direction="up">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-[360px] md:h-[460px]">
            <img
              src={imageSrc}
              alt={detail.name}
              className="w-full h-full object-cover"
            />
          </div>
        </MotionWrapper>

        {/* Teks Penjelasan di Bawah Gambar */}
        <MotionWrapper direction="up" delay={0.1}>
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-slate-700 text-base leading-relaxed">
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Penjelasan & Peran Lembaga
            </h2>
            <div className="whitespace-pre-line leading-relaxed text-slate-700 text-base">
              {detail.description}
            </div>
          </div>
        </MotionWrapper>

        {/* Susunan Pengurus & Perangkat */}
        {detail.membersList && detail.membersList.length > 0 && (
          <MotionWrapper direction="up" delay={0.2}>
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <Users className="w-6 h-6 text-emerald-600" />
                <h2 className="text-2xl font-bold text-slate-900">Susunan Pengurus & Perangkat</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {detail.membersList.map((m, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                      {m.role}
                    </span>
                    <div className="font-bold text-slate-900 text-sm">{m.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </MotionWrapper>
        )}
      </main>
    </div>
  );
}
