'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MotionWrapper from '@/components/MotionWrapper';
import { INITIAL_NEWS, NewsItem } from '@/lib/data';
import { Search, Calendar, User, Eye, ArrowRight, Newspaper } from 'lucide-react';

export default function BeritaPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setNewsLoading(true);
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setNewsList(data.data);
        }
      })
      .catch(() => {})
      .finally(() => setNewsLoading(false));
  }, []);


  const categories = ['Semua', 'Berita', 'Pengumuman', 'Kegiatan'];

  const filteredNews = newsList.filter((item) => {
    const matchesCat = activeCategory === 'Semua' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.snippet.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      
      {/* Header Banner */}
      <section className="relative w-full py-20 px-4 md:px-10 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeo2hwoG6K820I3aMhBdcNi53HKUP5d_Pjc6yq-PJM2PZ_mH2UfmSdyEBoSIwnVRFjOU7LBW_QeZ0tjG7ttAhz6ZOIBHbN7tiwtoShTb0F0wd4TYfWCiJgqYHY3641rJ6tdbSrC2oG8A7vWr-bX1qpgeBRKnMOTzE5M34rwFX8HCchhj8-v02_QUimKCMEorgRTqupgwxt-aeRLaKG468vpenpUFARvqMFrinw0ZhigBhS4pP-rnac"
            alt="Berita & Pengumuman Desa Siberobah"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-900"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <MotionWrapper direction="up" delay={0.1}>
            <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
              Pusat Informasi Desa
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Berita & <span className="text-emerald-400">Pengumuman</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-light">
              Dapatkan informasi terkini mengenai kegiatan desa, pengumuman publik, serta kabar pembangunan di Desa Siberobah.
            </p>
          </MotionWrapper>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-10 py-12 w-full space-y-10">
        
        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-emerald-700 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari berita atau pengumuman..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">Tidak ada berita yang sesuai dengan kata kunci pencarian Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredNews.map((news, idx) => (
              <MotionWrapper key={news.id} delay={idx * 0.08}>
                <Link href={`/berita/${news.slug}`} className="block group h-full">
                  <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-52 overflow-hidden">
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
                      <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {news.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {news.author}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-xl mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug break-words [overflow-wrap:anywhere]">
                        {news.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow break-words [overflow-wrap:anywhere]">
                        {news.snippet}
                      </p>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
                        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-slate-400 font-normal flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {news.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </MotionWrapper>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
