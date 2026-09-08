import MotionWrapper from '@/components/MotionWrapper';
import { Users, UserCheck, Home, MapPin } from 'lucide-react';
import { getPageContentStore } from '@/lib/pageContentStore';
import { prisma } from '@/lib/db';

export default async function KependudukanPage() {
  let data = getPageContentStore().kependudukan;

  if (prisma) {
    try {
      const record = await (prisma as any).pageContent?.findUnique({ where: { key: 'kependudukan' } });
      if (record && record.content) {
        data = { ...data, ...JSON.parse(record.content) };
      }
    } catch (e) { }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      {/* Header Banner */}
      <section className="relative w-full py-20 px-4 md:px-10 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop"
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-900"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <MotionWrapper direction="up" delay={0.1}>
            <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
              Statistik & Data Demografi
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              {data.title}
            </h1>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-light">
              {data.subtitle}
            </p>
          </MotionWrapper>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-10 py-16 space-y-16">
        {/* Quick Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MotionWrapper direction="up" delay={0.1}>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900">{data.totalPenduduk}</div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Penduduk</div>
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper direction="up" delay={0.2}>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                <Home className="w-7 h-7" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900">{data.totalKK}</div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Kepala Keluarga (KK)</div>
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper direction="up" delay={0.3}>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <UserCheck className="w-7 h-7" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900">{data.lakiLaki} / {data.perempuan}</div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Laki-Laki / Perempuan</div>
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper direction="up" delay={0.4}>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900">{data.dusunList ? data.dusunList.length : 3} Dusun</div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Wilayah Administratif</div>
              </div>
            </div>
          </MotionWrapper>
        </section>

        {/* Breakdown Dusun */}
        <section className="space-y-6">
          <div className="border-l-4 border-emerald-600 pl-4">
            <h2 className="text-2xl font-bold text-slate-900">Sebaran Penduduk per Dusun</h2>
            <p className="text-slate-600 text-sm">Pembagian populasi warga di wilayah administratif Desa Siberobah.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.dusunList.map((item, idx) => (
              <MotionWrapper key={idx} delay={idx * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                  <h3 className="font-bold text-slate-900 text-lg pt-1">{item.dusun}</h3>
                  <div className="flex items-center justify-between text-sm text-slate-600 pt-2 border-t border-slate-100">
                    <span>Jumlah Kepala Keluarga:</span>
                    <strong className="text-slate-900">{item.kk}</strong>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Jumlah Penduduk:</span>
                    <strong className="text-emerald-700 font-bold">{item.jiwa}</strong>
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
