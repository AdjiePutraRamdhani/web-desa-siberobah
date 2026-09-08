import MotionWrapper from '@/components/MotionWrapper';
import { getPageContentStore } from '@/lib/pageContentStore';
import { prisma } from '@/lib/db';

export default async function PotensiDesaPage() {
  let potensiData = getPageContentStore().potensiDesa;

  if (prisma) {
    try {
      const record = await (prisma as any).pageContent?.findUnique({ where: { key: 'potensiDesa' } });
      if (record && record.content) {
        potensiData = { ...potensiData, ...JSON.parse(record.content) };
      }
    } catch (e) {}
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      {/* Header Banner */}
      <section className="relative w-full py-20 px-4 md:px-10 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={potensiData.imageUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop'}
            alt={potensiData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-900"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <MotionWrapper direction="up" delay={0.1}>
            <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
              Keunggulan Lokal & Destinasi
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              {potensiData.title}
            </h1>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-light">
              {potensiData.subtitle}
            </p>
          </MotionWrapper>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 md:px-10 py-16 space-y-10 w-full">
        {/* Gambar Utama Potensi Desa */}
        <MotionWrapper direction="up">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-[380px] md:h-[480px]">
            <img
              src={potensiData.imageUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop'}
              alt={potensiData.title}
              className="w-full h-full object-cover"
            />
          </div>
        </MotionWrapper>

        {/* Teks Penjelasan di Bawah Gambar */}
        <MotionWrapper direction="up" delay={0.1}>
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-slate-700 text-base leading-relaxed">
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Penjelasan Potensi Desa Siberobah
            </h2>
            <div className="whitespace-pre-line leading-relaxed text-slate-700 text-base">
              {potensiData.content}
            </div>
          </div>
        </MotionWrapper>
      </main>
    </div>
  );
}
