import MotionWrapper from '@/components/MotionWrapper';
import Link from 'next/link';
import { Building2, Users, Heart, Shield, Landmark, Flame, ScrollText, ArrowRight } from 'lucide-react';

export const INSTITUTIONS = [
  {
    slug: 'pemerintah',
    name: 'Pemerintah Desa',
    desc: 'Struktur kepemimpinan, Kepala Desa, Sekretariat Desa, para Kasi dan Kaur serta Kepala Dusun yang mengelola administrasi & pelayanan umum.',
    icon: Building2,
    color: 'emerald',
    members: '9 Perangkat Desa',
  },
  {
    slug: 'bpd',
    name: 'BPD (Badan Permusyawaratan Desa)',
    desc: 'Lembaga perwujudan demokrasi dalam penyelenggaraan pemerintahan desa sebagai mitra penyeimbang dan penyalur aspirasi masyarakat.',
    icon: Landmark,
    color: 'teal',
    members: '5 Anggota Dewan',
  },
  {
    slug: 'pkk',
    name: 'PKK (Pemberdayaan Kesejahteraan Keluarga)',
    desc: 'Wadah gerakan masyarakat untuk membangun keluarga sejahtera melalui 10 program pokok PKK dan kegiatan pemberdayaan wanita.',
    icon: Heart,
    color: 'rose',
    members: '15 Pengurus Aktif',
  },
  {
    slug: 'posyandu',
    name: 'Posyandu (Balita & Lansia)',
    desc: 'Pusat pelayanan kesehatan dasar kemasyarakatan untuk pemantauan tumbuh kembang anak, imunisasi, pencegahan stunting, serta kesehatan lansia.',
    icon: Shield,
    color: 'blue',
    members: '8 Kader Kesehatan',
  },
  {
    slug: 'bkm',
    name: 'BKM (Badan Keswadayaan Masyarakat)',
    desc: 'Lembaga penanggulangan kemiskinan dan pengelolaan program pembangunan penataan lingkungan permukiman berbasis swadaya.',
    icon: Users,
    color: 'amber',
    members: '7 Pengurus BKM',
  },
  {
    slug: 'karang-taruna',
    name: 'Karang Taruna',
    desc: 'Wadah pembinaan dan pengembangan generasi muda desa dalam bidang keolahragaan, kesenian, sosial kemasyarakatan, dan wirausaha.',
    icon: Flame,
    color: 'orange',
    members: '25 Pemuda Desa',
  },
  {
    slug: 'lad',
    name: 'LAD (Lembaga Adat Desa)',
    desc: 'Penjaga warisan adat istiadat, nilai budaya lokal, kearifan tradisi, serta penyelesaian norma sosial bermasyarakat.',
    icon: ScrollText,
    color: 'purple',
    members: '5 Tokoh Adat',
  },
];

export default function KelembagaanIndexPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      {/* Header Banner */}
      <section className="relative w-full py-20 px-4 md:px-10 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop"
            alt="Kelembagaan Desa Siberobah"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-900"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <MotionWrapper direction="up" delay={0.1}>
            <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
              Struktur & Organisasi
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Kelembagaan <span className="text-emerald-400">Desa Siberobah</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-light">
              Mengenal lembaga-lembaga pemerintahan, kemasyarakatan, dan adat yang bersinergi dalam membangun Desa Siberobah.
            </p>
          </MotionWrapper>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-10 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INSTITUTIONS.map((inst, idx) => {
            const Icon = inst.icon;
            return (
              <MotionWrapper key={inst.slug} delay={idx * 0.08}>
                <Link
                  href={`/kelembagaan/${inst.slug}`}
                  className="block group h-full bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                        {inst.members}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                      {inst.name}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {inst.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 mt-6">
                    <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Lihat Struktur & Detail
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </MotionWrapper>
            );
          })}
        </div>
      </main>
    </div>
  );
}
