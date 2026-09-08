'use client';

import { useState } from 'react';
import MotionWrapper from '@/components/MotionWrapper';
import { INITIAL_SERVICES, PublicServiceItem } from '@/lib/data';
import { FileText, Clock, CheckCircle2, ShieldCheck, Download, Search, HelpCircle, Send } from 'lucide-react';

export default function LayananPage() {
  const [selectedService, setSelectedService] = useState<PublicServiceItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  // Form State
  const [formData, setFormData] = useState({ name: '', nik: '', phone: '', purpose: '' });
  const [submitting, setSubmitting] = useState(false);
  const [successSubmitted, setSuccessSubmitted] = useState<any>(null);

  const categories = ['Semua', 'Surat Keterangan', 'Kependudukan', 'Bantuan Sosial'];

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceTitle: selectedService.title,
          ...formData,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessSubmitted(data.data || { ...formData, serviceTitle: selectedService.title });
        setFormData({ name: '', nik: '', phone: '', purpose: '' });
        setSelectedService(null);
      } else {
        alert(data.message || 'Gagal mengirim pengajuan. Silakan coba lagi.');
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan saat mengirimkan pengajuan.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredServices = INITIAL_SERVICES.filter((srv) => {
    const matchesCat = activeCategory === 'Semua' || srv.category === activeCategory;
    const matchesSearch =
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">

      {/* Header Banner */}
      <section className="relative w-full py-20 px-4 md:px-10 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeo2hwoG6K820I3aMhBdcNi53HKUP5d_Pjc6yq-PJM2PZ_mH2UfmSdyEBoSIwnVRFjOU7LBW_QeZ0tjG7ttAhz6ZOIBHbN7tiwtoShTb0F0wd4TYfWCiJgqYHY3641rJ6tdbSrC2oG8A7vWr-bX1qpgeBRKnMOTzE5M34rwFX8HCchhj8-v02_QUimKCMEorgRTqupgwxt-aeRLaKG468vpenpUFARvqMFrinw0ZhigBhS4pP-rnac"
            alt="Layanan Publik Desa Siberobah"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-900"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <MotionWrapper direction="up" delay={0.1}>
            <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
              Pelayanan Terpadu Mandiri
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Layanan Publik <span className="text-emerald-400">Desa Siberobah</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-light">
              Pengurusan surat keterangan dan administrasi kependudukan serba digital, transparan, dan tanpa biaya tambahan.
            </p>
          </MotionWrapper>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-10 py-12 w-full space-y-12">

        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeCategory === cat
                    ? 'bg-emerald-700 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari surat atau layanan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map((service, idx) => (
            <MotionWrapper key={service.id} delay={idx * 0.08}>
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                      {service.cost}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-xl mb-2 group-hover:text-emerald-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.description}</p>

                  {/* Requirements List */}
                  <div className="bg-slate-50 p-4 rounded-xl mb-6 space-y-2 border border-slate-100">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Persyaratan Dokumen:
                    </div>
                    {service.requirements.map((req, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>Waktu: {service.processingTime}</span>
                  </div>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors shadow-md flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Ajukan Sekarang</span>
                  </button>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>

      </main>

      {/* Modal Application Form */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <MotionWrapper direction="up" className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Formulir Pengajuan {selectedService.title}</h3>
            <p className="text-slate-500 text-xs mb-6">Isi data di bawah ini untuk mengajukan permohonan ke Balai Desa Siberobah.</p>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap (Sesuai KTP)</label>
                <input
                  required
                  type="text"
                  placeholder="Budi Santoso"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">NIK (16 Digit)</label>
                <input
                  required
                  type="text"
                  maxLength={16}
                  minLength={16}
                  placeholder="3301xxxxxxxxxxxx"
                  value={formData.nik}
                  onChange={(e) => setFormData({ ...formData, nik: e.target.value.replace(/[^0-9]/g, '') })}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nomor WhatsApp Aktif</label>
                <input
                  required
                  type="tel"
                  placeholder="0812xxxxxxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Keperluan</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Jelaskan secara singkat alasan pengajuan surat..."
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  disabled={submitting}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <span>Kirim Pengajuan</span>
                  )}
                </button>
              </div>
            </form>
          </MotionWrapper>
        </div>
      )}

      {/* Success Modal */}
      {successSubmitted && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <MotionWrapper direction="up" className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Pengajuan Berhasil Terkirim!</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Permohonan <strong>{successSubmitted.serviceTitle}</strong> atas nama <strong>{successSubmitted.name}</strong> telah tersimpan di sistem Balai Desa Siberobah.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl text-xs text-left text-slate-600 space-y-1">
              <div><strong>Status:</strong> <span className="text-emerald-700 font-semibold">Menunggu Persetujuan Admin</span></div>
              <div><strong>No. WA:</strong> {successSubmitted.phone}</div>
              <div><strong>NIK:</strong> {successSubmitted.nik}</div>
            </div>
            <button
              onClick={() => setSuccessSubmitted(null)}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition-colors shadow-md"
            >
              Tutup & Selesai
            </button>
          </MotionWrapper>
        </div>
      )}

    </div>
  );
}

