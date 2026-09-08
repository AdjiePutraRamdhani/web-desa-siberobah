import MotionWrapper from '@/components/MotionWrapper';
import { History, Eye, Target, Users, MapPin, Building, ShieldCheck } from 'lucide-react';
import { getPageContentStore } from '@/lib/pageContentStore';
import { prisma } from '@/lib/db';

export default async function ProfilPage() {
  let sejarah = getPageContentStore().sejarah;
  let kependudukan = getPageContentStore().kependudukan;

  if (prisma) {
    try {
      const records = await prisma.pageContent.findMany();
      records.forEach((rec: any) => {
        if (rec.key === 'sejarah' && rec.content) {
          try { sejarah = { ...sejarah, ...JSON.parse(rec.content) }; } catch (e) {}
        }
        if (rec.key === 'kependudukan' && rec.content) {
          try { kependudukan = { ...kependudukan, ...JSON.parse(rec.content) }; } catch (e) {}
        }
      });
    } catch (e) {}
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">

      {/* Header Banner */}
      <section className="relative w-full py-20 px-4 md:px-10 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={sejarah.imageUrl || '/sejarah.jpg'}
            alt="Profil Desa Siberobah"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-900"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <MotionWrapper direction="up" delay={0.1}>
            <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
              Mengenal Desa Kami
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Profil <span className="text-emerald-400">Desa Siberobah</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-light">
              {sejarah.subtitle}
            </p>
          </MotionWrapper>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-10 py-16 space-y-20">

        {/* History Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <MotionWrapper direction="right">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 h-[400px]">
              <img
                src={sejarah.imageUrl || '/sejarah.jpg'}
                alt={sejarah.historyTitle}
                className="w-full h-full object-cover"
              />
            </div>
          </MotionWrapper>

          <MotionWrapper direction="left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <History className="w-5 h-5" />
                <span>Sejarah Desa</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900">{sejarah.historyTitle}</h2>
              <p className="text-slate-600 leading-relaxed">
                {sejarah.historyText1}
              </p>
              <p className="text-slate-600 leading-relaxed">
                {sejarah.historyText2}
              </p>
            </div>
          </MotionWrapper>
        </section>

        {/* Vision & Mission */}
        <section className="space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Visi & Misi</h2>
            <p className="text-slate-600">Arah tujuan pembangunan dan kesejahteraan bersama warga Desa Siberobah.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Vision */}
            <MotionWrapper direction="up" delay={0.1}>
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-md relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-600"></div>
                <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Visi Utama</h3>
                <p className="text-slate-700 italic leading-relaxed text-base">
                  &quot;{sejarah.vision}&quot;
                </p>
              </div>
            </MotionWrapper>

            {/* Mission List */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {sejarah.missions.map((misi, idx) => (
                <MotionWrapper key={misi.num || idx} delay={0.1 * idx}>
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden h-full">
                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-sm">
                        {misi.num}
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base mb-1.5">{misi.title}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{misi.desc}</p>
                      </div>
                    </div>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Bento Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Demografi & Statistik Desa</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-emerald-700 text-white rounded-2xl p-6 flex flex-col justify-between h-44 shadow-lg">
              <MapPin className="w-8 h-8 opacity-80" />
              <div>
                <div className="text-3xl font-extrabold">1.357 <span className="text-sm font-normal">Ha</span></div>
                <div className="text-xs text-emerald-100 font-medium">Luas Wilayah Total</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between h-44 shadow-sm">
              <Users className="w-8 h-8 text-emerald-600" />
              <div>
                <div className="text-3xl font-extrabold text-slate-900">{kependudukan.totalPenduduk}</div>
                <div className="text-xs text-slate-500 font-medium">Total Penduduk</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between h-44 shadow-sm">
              <Building className="w-8 h-8 text-emerald-600" />
              <div>
                <div className="text-3xl font-extrabold text-slate-900">{kependudukan.totalKK}</div>
                <div className="text-xs text-slate-500 font-medium">Kepala Keluarga (KK)</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between h-44 shadow-sm">
              <ShieldCheck className="w-8 h-8 text-amber-600" />
              <div>
                <div className="text-3xl font-extrabold text-slate-900">{kependudukan.dusunList?.length || 3} Dusun</div>
                <div className="text-xs text-slate-500 font-medium">Wilayah Administratif</div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
