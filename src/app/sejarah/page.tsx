import MotionWrapper from '@/components/MotionWrapper';
import { History, Eye } from 'lucide-react';
import Link from 'next/link';
import { getPageContentStore } from '@/lib/pageContentStore';
import { prisma } from '@/lib/db';

export default async function SejarahDesaPage() {
  let sejarahData = getPageContentStore().sejarah;

  if (prisma) {
    try {
      const record = await (prisma as any).pageContent?.findUnique({ where: { key: 'sejarah' } });
      if (record && record.content) {
        sejarahData = { ...sejarahData, ...JSON.parse(record.content) };
      }
    } catch (e) { }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      {/* Header Banner */}
      <section className="relative w-full py-20 px-4 md:px-10 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={sejarahData.imageUrl || '/sejarah.jpg'}
            alt={sejarahData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-900"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <MotionWrapper direction="up" delay={0.1}>
            <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
              Jejak Historis & Nilai Budaya
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              {sejarahData.title}
            </h1>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-light">
              {sejarahData.subtitle}
            </p>
          </MotionWrapper>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-10 py-16 space-y-16">
        {/* Origin & Meaning */}
        <section className="grid grid-cols-1 md:grid-cols-1 gap-12 items-center">
          <MotionWrapper direction="right">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 h-[420px]">
              <img
                src={sejarahData.imageUrl || '/sejarah.jpg'}
                alt={sejarahData.historyTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-emerald-600/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Warisan Budaya Lokal
                </span>
                <h3 className="text-xl font-bold mt-2">{sejarahData.historyTitle}</h3>
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper direction="left">
            <div className="space-y-5">
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                {sejarahData.historyTitle}
              </h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {sejarahData.historyText1}
              </p>
              {sejarahData.historyText2 && (
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {sejarahData.historyText2}
                </p>
              )}
            </div>
          </MotionWrapper>
        </section>
      </main>
    </div>
  );
}
