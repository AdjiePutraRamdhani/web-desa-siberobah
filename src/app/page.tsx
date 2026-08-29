'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Leaf, ShieldCheck, Newspaper, Store, Users, MapPin, Award, CheckCircle2, Building } from 'lucide-react';
import MotionWrapper from '@/components/MotionWrapper';
import { INITIAL_NEWS, INITIAL_SERVICES, INITIAL_WISATA_UMKM } from '@/lib/data';

export default function HomePage() {
  const featuredNews = INITIAL_NEWS.slice(0, 3);
  const featuredWisata = INITIAL_WISATA_UMKM.slice(0, 3);
  const [heroImgError, setHeroImgError] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">

      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center pt-16 pb-20 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-45">
          <img
            src={heroImgError ? "https://lh3.googleusercontent.com/aida-public/AB6AXuBeo2hwoG6K820I3aMhBdcNi53HKUP5d_Pjc6yq-PJM2PZ_mH2UfmSdyEBoSIwnVRFjOU7LBW_QeZ0tjG7ttAhz6ZOIBHbN7tiwtoShTb0F0wd4TYfWCiJgqYHY3641rJ6tdbSrC2oG8A7vWr-bX1qpgeBRKnMOTzE5M34rwFX8HCchhj8-v02_QUimKCMEorgRTqupgwxt-aeRLaKG468vpenpUFARvqMFrinw0ZhigBhS4pP-rnac" : "/hero.jpg"}
            alt="Pemandangan Desa Siberobah"
            className="w-full h-full object-cover"
            onError={() => setHeroImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-10">
          <div className="max-w-3xl">
            <MotionWrapper direction="up" delay={0.1}>
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-md">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span>Smart Village Initiative</span>
              </div>
            </MotionWrapper>

            <MotionWrapper direction="up" delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                Mewujudkan Desa Siberobah <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-300">
                  Cerdas & Mandiri
                </span>
              </h1>
            </MotionWrapper>

            <MotionWrapper direction="up" delay={0.3}>
              <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl font-light">
                Harmonisasi antara warisan budaya pedesaan dan inovasi teknologi digital untuk pelayanan masyarakat yang lebih baik, cepat, dan transparan.
              </p>
            </MotionWrapper>

            <MotionWrapper direction="up" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/layanan"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Lihat Layanan Publik</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/wisata-umkm"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-8 py-3.5 rounded-xl backdrop-blur-md transition-all text-center"
                >
                  Jelajahi Potensi Desa
                </Link>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 md:px-10 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
          <div className="flex items-center gap-4 p-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">500</div>
              <div className="text-xs text-slate-500 font-medium">Total Penduduk</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">1.250 Ha</div>
              <div className="text-xs text-slate-500 font-medium">Luas Wilayah</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">150+</div>
              <div className="text-xs text-slate-500 font-medium">Kepala Keluarga (KK)</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">100%</div>
              <div className="text-xs text-slate-500 font-medium">Layanan Digital</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 max-w-7xl mx-auto px-4 md:px-10 w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Layanan Mandiri Warga</h2>
          <p className="text-slate-600">Pengurusan dokumen kependudukan dan perizinan desa tanpa antre, serba praktis dan transparan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {INITIAL_SERVICES.map((srv, idx) => (
            <MotionWrapper key={srv.id} delay={idx * 0.1}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{srv.title}</h3>
                <p className="text-sm text-slate-600 mb-6 flex-grow">{srv.description}</p>
                <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-100">
                  <span className="text-slate-500 font-medium">Estimasi: {srv.processingTime}</span>
                  <span className="text-emerald-700 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Ajukan <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Tourism & UMKM Highlights */}
      <section className="py-20 bg-slate-100/70 border-y border-slate-200/60 w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <div className="text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">Potensi Lokal</div>
              <h2 className="text-3xl font-bold text-slate-900">Wisata & Produk Unggulan</h2>
            </div>
            <Link href="/wisata-umkm" className="text-emerald-700 font-semibold hover:underline flex items-center gap-1">
              Lihat Semua Potensi <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredWisata.map((item, idx) => (
              <MotionWrapper key={item.id} delay={idx * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-emerald-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                      {item.type}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{item.name}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-4">{item.description}</p>
                    <div className="flex justify-between items-center text-xs text-slate-500 pt-3 border-t border-slate-100">
                      <span>{item.location}</span>
                      <span className="font-semibold text-amber-600">⭐ {item.rating}</span>
                    </div>
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 max-w-7xl mx-auto px-4 md:px-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <div className="text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">Informasi Terkini</div>
            <h2 className="text-3xl font-bold text-slate-900">Berita & Pengumuman</h2>
          </div>
          <Link href="/berita" className="text-emerald-700 font-semibold hover:underline flex items-center gap-1">
            Lihat Semua Berita <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredNews.map((news, idx) => (
            <MotionWrapper key={news.id} delay={idx * 0.1}>
              <Link href={`/berita/${news.slug}`} className="block group">
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={news.imageUrl}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
                      {news.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs text-slate-400 mb-2">{news.date} • {news.author}</div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-grow">{news.snippet}</p>
                    <span className="text-emerald-700 font-semibold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </MotionWrapper>
          ))}
        </div>
      </section>

    </div>
  );
}
