'use client';

import { useState } from 'react';
import MotionWrapper from '@/components/MotionWrapper';
import { INITIAL_WISATA_UMKM, TourismItem } from '@/lib/data';
import { Search, MapPin, Phone, Star, Filter, Store, Compass } from 'lucide-react';

export default function WisataUMKMPage() {
  const [activeTab, setActiveTab] = useState<'Semua' | 'Wisata' | 'UMKM'>('Semua');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Semua', 'Wisata Alam', 'Wisata Edukasi', 'Kerajinan', 'Olahan Pangan'];

  const filteredItems = INITIAL_WISATA_UMKM.filter((item) => {
    const matchesTab = activeTab === 'Semua' || item.type === activeTab;
    const matchesCat = activeCategory === 'Semua' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      
      {/* Header Banner */}
      <section className="relative w-full py-20 px-4 md:px-10 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeo2hwoG6K820I3aMhBdcNi53HKUP5d_Pjc6yq-PJM2PZ_mH2UfmSdyEBoSIwnVRFjOU7LBW_QeZ0tjG7ttAhz6ZOIBHbN7tiwtoShTb0F0wd4TYfWCiJgqYHY3641rJ6tdbSrC2oG8A7vWr-bX1qpgeBRKnMOTzE5M34rwFX8HCchhj8-v02_QUimKCMEorgRTqupgwxt-aeRLaKG468vpenpUFARvqMFrinw0ZhigBhS4pP-rnac"
            alt="Wisata & UMKM Desa Siberobah"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-900"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <MotionWrapper direction="up" delay={0.1}>
            <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
              Potensi & Ekonomi Lokal
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Wisata & <span className="text-emerald-400">UMKM Desa Siberobah</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-light">
              Temukan keindahan alam yang memukau dan dukung produk lokal berkualitas hasil karya kreatif warga Desa Siberobah.
            </p>
          </MotionWrapper>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-10 py-12 w-full space-y-10">
        
        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          
          {/* Main Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-xl gap-1 w-full md:w-auto">
            {(['Semua', 'Wisata', 'UMKM'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-emerald-700 text-white shadow'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tab === 'Wisata' && <Compass className="w-4 h-4 inline mr-1.5 -mt-0.5" />}
                {tab === 'UMKM' && <Store className="w-4 h-4 inline mr-1.5 -mt-0.5" />}
                {tab}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari wisata atau produk UMKM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Subcategories */}
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="w-4 h-4 text-slate-400 mr-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid List */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">Tidak ada wisata atau produk UMKM yang cocok dengan pencarian Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredItems.map((item, idx) => (
              <MotionWrapper key={item.id} delay={idx * 0.08}>
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span
                      className={`absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full shadow ${
                        item.type === 'Wisata' ? 'bg-emerald-700' : 'bg-emerald-600'
                      }`}
                    >
                      {item.type} • {item.category}
                    </span>
                    <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-slate-900 text-xl mb-2 group-hover:text-emerald-700 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{item.description}</p>

                    <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      {item.priceRange && (
                        <div className="flex items-center gap-2 font-semibold text-slate-800">
                          <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
                            Rp
                          </span>
                          <span>{item.priceRange}</span>
                        </div>
                      )}
                    </div>

                    {item.contact && (
                      <a
                        href={`https://wa.me/${item.contact.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors border border-emerald-200"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Hubungi Pengelola ({item.contact})</span>
                      </a>
                    )}
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
