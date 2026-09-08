'use client';

import { useState, useEffect } from 'react';
import {
  FileText,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Save,
  Plus,
  Trash2,
  Building2,
  Users,
  History,
  TrendingUp,
  Lightbulb,
  Home,
  Image,
} from 'lucide-react';
import { INITIAL_PAGE_CONTENTS, AllPageContents } from '@/lib/pageContentStore';

export default function AdminPageContentEditor() {
  const [activeTab, setActiveTab] = useState<'sejarah' | 'kependudukan' | 'kelembagaan' | 'padDesa' | 'potensiDesa' | 'home'>('sejarah');
  const [selectedKelembagaanKey, setSelectedKelembagaanKey] = useState<string>('pemerintah');

  const [contents, setContents] = useState<AllPageContents>(INITIAL_PAGE_CONTENTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fetch page contents from server
  const fetchAllContents = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/page-content');
      const data = await res.json();
      if (data.success && data.data) {
        setContents((prev) => ({ ...prev, ...data.data }));
      }
    } catch (err) {
      console.error('Error fetching page contents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllContents();
  }, []);

  // Save active section content
  const handleSaveContent = async (keyToSave: keyof AllPageContents) => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/page-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: keyToSave,
          content: contents[keyToSave],
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: `Perubahan halaman "${keyToSave}" berhasil disimpan!` });
      } else {
        setMessage({ type: 'error', text: data.message || 'Gagal menyimpan perubahan.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan jaringan saat menyimpan.' });
    } finally {
      setSaving(false);
    }
  };

  // Image Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, onSuccessUrl: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImg(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        onSuccessUrl(data.url);
        setMessage({ type: 'success', text: 'Gambar berhasil diunggah!' });
      } else {
        alert(data.message || 'Gagal mengunggah gambar.');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat mengunggah file gambar.');
    } finally {
      setUploadingImg(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-emerald-600 mb-3" />
        <p className="text-slate-600 text-sm font-semibold">Memuat Data Konten Halaman...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Alert Notification */}
      {message && (
        <div
          className={`p-4 rounded-2xl border text-sm font-semibold flex items-center justify-between ${message.type === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
        >
          <div className="flex items-center gap-2">
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-xs underline opacity-80">
            Tutup
          </button>
        </div>
      )}

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap gap-2 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm">
        {[
          { id: 'sejarah', label: 'Sejarah Desa', icon: History },
          { id: 'kependudukan', label: 'Kependudukan', icon: Users },
          { id: 'kelembagaan', label: 'Kelembagaan Desa', icon: Building2 },
          { id: 'padDesa', label: 'PAD Desa', icon: TrendingUp },
          { id: 'potensiDesa', label: 'Potensi Desa', icon: Lightbulb },
          { id: 'home', label: 'Beranda Utama', icon: Home },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setMessage(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all ${isActive
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: SEJARAH DESA */}
      {activeTab === 'sejarah' && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Edit Halaman Sejarah Desa</h3>
              <p className="text-xs text-slate-500 mt-1">Ubah judul, narasi sejarah, visi-misi, serta foto halaman sejarah.</p>
            </div>
            <button
              onClick={() => handleSaveContent('sejarah')}
              disabled={saving}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Halaman Sejarah'}</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Utama Halaman</label>
                <input
                  type="text"
                  value={contents.sejarah.title}
                  onChange={(e) =>
                    setContents((prev) => ({
                      ...prev,
                      sejarah: { ...prev.sejarah, title: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Sub-Sejarah</label>
                <input
                  type="text"
                  value={contents.sejarah.historyTitle}
                  onChange={(e) =>
                    setContents((prev) => ({
                      ...prev,
                      sejarah: { ...prev.sejarah, historyTitle: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle Banner</label>
              <input
                type="text"
                value={contents.sejarah.subtitle}
                onChange={(e) =>
                  setContents((prev) => ({
                    ...prev,
                    sejarah: { ...prev.sejarah, subtitle: e.target.value },
                  }))
                }
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Gambar Sejarah */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              <label className="block text-xs font-bold text-slate-700">Foto Utama Halaman Sejarah</label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={contents.sejarah.imageUrl || '/sejarah.jpg'}
                  alt="Preview Sejarah"
                  className="w-32 h-20 object-cover rounded-xl border border-slate-300"
                />
                <div className="flex-grow space-y-2 w-full">
                  <input
                    type="text"
                    value={contents.sejarah.imageUrl}
                    onChange={(e) =>
                      setContents((prev) => ({
                        ...prev,
                        sejarah: { ...prev.sejarah, imageUrl: e.target.value },
                      }))
                    }
                    placeholder="URL gambar atau unggah dari perangkat..."
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <label className="inline-flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold px-3.5 py-1.5 rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImg ? 'Mengunggah...' : 'Pilih & Unggah Foto Baru'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (url) =>
                          setContents((prev) => ({
                            ...prev,
                            sejarah: { ...prev.sejarah, imageUrl: url },
                          }))
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Teks Penjelasan Sejarah */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Penjelasan Sejarah Paragraf 1</label>
              <textarea
                rows={3}
                value={contents.sejarah.historyText1}
                onChange={(e) =>
                  setContents((prev) => ({
                    ...prev,
                    sejarah: { ...prev.sejarah, historyText1: e.target.value },
                  }))
                }
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: KEPENDUDUKAN */}
      {activeTab === 'kependudukan' && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Edit Data Kependudukan</h3>
              <p className="text-xs text-slate-500 mt-1">Ubah angka statistik penduduk, jumlah KK, dan data sebaran dusun.</p>
            </div>
            <button
              onClick={() => handleSaveContent('kependudukan')}
              disabled={saving}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Data Kependudukan'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Total Penduduk (Jiwa)</label>
              <input
                type="number"
                value={contents.kependudukan.totalPenduduk}
                onChange={(e) =>
                  setContents((prev) => ({
                    ...prev,
                    kependudukan: { ...prev.kependudukan, totalPenduduk: Number(e.target.value) },
                  }))
                }
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Total Kepala Keluarga (KK)</label>
              <input
                type="number"
                value={contents.kependudukan.totalKK}
                onChange={(e) =>
                  setContents((prev) => ({
                    ...prev,
                    kependudukan: { ...prev.kependudukan, totalKK: Number(e.target.value) },
                  }))
                }
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Jumlah Laki-Laki</label>
              <input
                type="number"
                value={contents.kependudukan.lakiLaki}
                onChange={(e) =>
                  setContents((prev) => ({
                    ...prev,
                    kependudukan: { ...prev.kependudukan, lakiLaki: Number(e.target.value) },
                  }))
                }
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Jumlah Perempuan</label>
              <input
                type="number"
                value={contents.kependudukan.perempuan}
                onChange={(e) =>
                  setContents((prev) => ({
                    ...prev,
                    kependudukan: { ...prev.kependudukan, perempuan: Number(e.target.value) },
                  }))
                }
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Dusun Manager */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Sebaran Per Dusun</label>
              <button
                type="button"
                onClick={() =>
                  setContents((prev) => ({
                    ...prev,
                    kependudukan: {
                      ...prev.kependudukan,
                      dusunList: [
                        ...prev.kependudukan.dusunList,
                        { dusun: `Dusun ${prev.kependudukan.dusunList.length + 1}`, kk: '50 KK', jiwa: '150 Jiwa' },
                      ],
                    },
                  }))
                }
                className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Dusun</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {contents.kependudukan.dusunList.map((dusun, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={dusun.dusun}
                      onChange={(e) => {
                        const newArr = [...contents.kependudukan.dusunList];
                        newArr[idx].dusun = e.target.value;
                        setContents((prev) => ({
                          ...prev,
                          kependudukan: { ...prev.kependudukan, dusunList: newArr },
                        }));
                      }}
                      className="font-bold text-xs bg-white border border-slate-200 rounded px-2 py-1"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newArr = contents.kependudukan.dusunList.filter((_, i) => i !== idx);
                        setContents((prev) => ({
                          ...prev,
                          kependudukan: { ...prev.kependudukan, dusunList: newArr },
                        }));
                      }}
                      className="text-rose-600 hover:text-rose-800"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400">Total KK</span>
                      <input
                        type="text"
                        value={dusun.kk}
                        onChange={(e) => {
                          const newArr = [...contents.kependudukan.dusunList];
                          newArr[idx].kk = e.target.value;
                          setContents((prev) => ({
                            ...prev,
                            kependudukan: { ...prev.kependudukan, dusunList: newArr },
                          }));
                        }}
                        className="w-full bg-white border border-slate-200 rounded px-2 py-0.5"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400">Total Jiwa</span>
                      <input
                        type="text"
                        value={dusun.jiwa}
                        onChange={(e) => {
                          const newArr = [...contents.kependudukan.dusunList];
                          newArr[idx].jiwa = e.target.value;
                          setContents((prev) => ({
                            ...prev,
                            kependudukan: { ...prev.kependudukan, dusunList: newArr },
                          }));
                        }}
                        className="w-full bg-white border border-slate-200 rounded px-2 py-0.5"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: KELEMBAGAAN DESA */}
      {activeTab === 'kelembagaan' && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Edit Data Kelembagaan Desa</h3>
              <p className="text-xs text-slate-500 mt-1">Pilih lembaga lalu ubah pengurus, deskripsi, dan tugas utama.</p>
            </div>
            <button
              onClick={() => handleSaveContent('kelembagaan')}
              disabled={saving}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Semua Lembaga'}</span>
            </button>
          </div>

          {/* Select Submenu */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'pemerintah', name: 'Pemerintah' },
              { key: 'bpd', name: 'BPD' },
              { key: 'pkk', name: 'PKK' },
              { key: 'posyandu', name: 'Posyandu' },
              { key: 'bkm', name: 'BKM' },
              { key: 'karang-taruna', name: 'Karang Taruna' },
              { key: 'lad', name: 'LAD' },
            ].map((lem) => (
              <button
                key={lem.key}
                onClick={() => setSelectedKelembagaanKey(lem.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedKelembagaanKey === lem.key
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                {lem.name}
              </button>
            ))}
          </div>

          {/* Editor Form for Selected Institution */}
          {contents.kelembagaan[selectedKelembagaanKey] && (
            <div className="space-y-5 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lembaga</label>
                  <input
                    type="text"
                    value={contents.kelembagaan[selectedKelembagaanKey].name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setContents((prev) => ({
                        ...prev,
                        kelembagaan: {
                          ...prev.kelembagaan,
                          [selectedKelembagaanKey]: {
                            ...prev.kelembagaan[selectedKelembagaanKey],
                            name: val,
                          },
                        },
                      }));
                    }}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori / Peran</label>
                  <input
                    type="text"
                    value={contents.kelembagaan[selectedKelembagaanKey].category}
                    onChange={(e) => {
                      const val = e.target.value;
                      setContents((prev) => ({
                        ...prev,
                        kelembagaan: {
                          ...prev.kelembagaan,
                          [selectedKelembagaanKey]: {
                            ...prev.kelembagaan[selectedKelembagaanKey],
                            category: val,
                          },
                        },
                      }));
                    }}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Singkat Lembaga</label>
                <textarea
                  rows={3}
                  value={contents.kelembagaan[selectedKelembagaanKey].description}
                  onChange={(e) => {
                    const val = e.target.value;
                    setContents((prev) => ({
                      ...prev,
                      kelembagaan: {
                        ...prev.kelembagaan,
                        [selectedKelembagaanKey]: {
                          ...prev.kelembagaan[selectedKelembagaanKey],
                          description: val,
                        },
                      },
                    }));
                  }}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800"
                />
              </div>

              {/* Members Manager */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Daftar Pengurus / Perangkat ({contents.kelembagaan[selectedKelembagaanKey].membersList?.length || 0})
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const currentList = contents.kelembagaan[selectedKelembagaanKey].membersList || [];
                      const updated = [...currentList, { role: 'Jabatan Baru', name: 'Nama Pengurus' }];
                      setContents((prev) => ({
                        ...prev,
                        kelembagaan: {
                          ...prev.kelembagaan,
                          [selectedKelembagaanKey]: {
                            ...prev.kelembagaan[selectedKelembagaanKey],
                            membersList: updated,
                          },
                        },
                      }));
                    }}
                    className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Pengurus</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {contents.kelembagaan[selectedKelembagaanKey].membersList?.map((mem, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                      <div className="flex-grow space-y-1">
                        <input
                          type="text"
                          value={mem.role}
                          onChange={(e) => {
                            const updated = [...contents.kelembagaan[selectedKelembagaanKey].membersList];
                            updated[idx].role = e.target.value;
                            setContents((prev) => ({
                              ...prev,
                              kelembagaan: {
                                ...prev.kelembagaan,
                                [selectedKelembagaanKey]: {
                                  ...prev.kelembagaan[selectedKelembagaanKey],
                                  membersList: updated,
                                },
                              },
                            }));
                          }}
                          placeholder="Jabatan"
                          className="w-full text-xs font-bold bg-white border border-slate-200 rounded px-2 py-1 text-emerald-800"
                        />
                        <input
                          type="text"
                          value={mem.name}
                          onChange={(e) => {
                            const updated = [...contents.kelembagaan[selectedKelembagaanKey].membersList];
                            updated[idx].name = e.target.value;
                            setContents((prev) => ({
                              ...prev,
                              kelembagaan: {
                                ...prev.kelembagaan,
                                [selectedKelembagaanKey]: {
                                  ...prev.kelembagaan[selectedKelembagaanKey],
                                  membersList: updated,
                                },
                              },
                            }));
                          }}
                          placeholder="Nama Pengurus"
                          className="w-full text-xs bg-white border border-slate-200 rounded px-2 py-1"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = contents.kelembagaan[selectedKelembagaanKey].membersList.filter((_, i) => i !== idx);
                          setContents((prev) => ({
                            ...prev,
                            kelembagaan: {
                              ...prev.kelembagaan,
                              [selectedKelembagaanKey]: {
                                ...prev.kelembagaan[selectedKelembagaanKey],
                                membersList: updated,
                              },
                            },
                          }));
                        }}
                        className="text-rose-600 hover:text-rose-800 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 4: PAD DESA */}
      {activeTab === 'padDesa' && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Edit Halaman PAD Desa</h3>
              <p className="text-xs text-slate-500 mt-1">Ubah judul, gambar utama, dan teks penjelasan PAD Desa.</p>
            </div>
            <button
              onClick={() => handleSaveContent('padDesa')}
              disabled={saving}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Data PAD Desa'}</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Halaman</label>
                <input
                  type="text"
                  value={contents.padDesa.title}
                  onChange={(e) =>
                    setContents((prev) => ({
                      ...prev,
                      padDesa: { ...prev.padDesa, title: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Pengantar Banner</label>
                <input
                  type="text"
                  value={contents.padDesa.subtitle}
                  onChange={(e) =>
                    setContents((prev) => ({
                      ...prev,
                      padDesa: { ...prev.padDesa, subtitle: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                />
              </div>
            </div>

            {/* Gambar PAD Desa */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              <label className="block text-xs font-bold text-slate-700">Gambar Utama Halaman PAD Desa</label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={contents.padDesa.imageUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop'}
                  alt="Preview PAD Desa"
                  className="w-32 h-20 object-cover rounded-xl border border-slate-300"
                />
                <div className="flex-grow space-y-2 w-full">
                  <input
                    type="text"
                    value={contents.padDesa.imageUrl}
                    onChange={(e) =>
                      setContents((prev) => ({
                        ...prev,
                        padDesa: { ...prev.padDesa, imageUrl: e.target.value },
                      }))
                    }
                    placeholder="URL gambar atau unggah dari perangkat..."
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <label className="inline-flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold px-3.5 py-1.5 rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImg ? 'Mengunggah...' : 'Pilih & Unggah Gambar Baru'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (url) =>
                          setContents((prev) => ({
                            ...prev,
                            padDesa: { ...prev.padDesa, imageUrl: url },
                          }))
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Teks Penjelasan PAD Desa */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Teks Penjelasan Lengkap (Di Bawah Gambar)</label>
              <textarea
                rows={6}
                value={contents.padDesa.content}
                onChange={(e) =>
                  setContents((prev) => ({
                    ...prev,
                    padDesa: { ...prev.padDesa, content: e.target.value },
                  }))
                }
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 leading-relaxed"
                placeholder="Tuliskan penjelasan detail laporan transparansi PAD Desa..."
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: POTENSI DESA */}
      {activeTab === 'potensiDesa' && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Edit Halaman Potensi Desa</h3>
              <p className="text-xs text-slate-500 mt-1">Ubah judul, gambar utama, dan teks penjelasan Potensi Desa.</p>
            </div>
            <button
              onClick={() => handleSaveContent('potensiDesa')}
              disabled={saving}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Potensi Desa'}</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Halaman</label>
                <input
                  type="text"
                  value={contents.potensiDesa.title}
                  onChange={(e) =>
                    setContents((prev) => ({
                      ...prev,
                      potensiDesa: { ...prev.potensiDesa, title: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Pengantar Banner</label>
                <input
                  type="text"
                  value={contents.potensiDesa.subtitle}
                  onChange={(e) =>
                    setContents((prev) => ({
                      ...prev,
                      potensiDesa: { ...prev.potensiDesa, subtitle: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                />
              </div>
            </div>

            {/* Gambar Potensi Desa */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              <label className="block text-xs font-bold text-slate-700">Gambar Utama Halaman Potensi Desa</label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={contents.potensiDesa.imageUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop'}
                  alt="Preview Potensi Desa"
                  className="w-32 h-20 object-cover rounded-xl border border-slate-300"
                />
                <div className="flex-grow space-y-2 w-full">
                  <input
                    type="text"
                    value={contents.potensiDesa.imageUrl}
                    onChange={(e) =>
                      setContents((prev) => ({
                        ...prev,
                        potensiDesa: { ...prev.potensiDesa, imageUrl: e.target.value },
                      }))
                    }
                    placeholder="URL gambar atau unggah dari perangkat..."
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <label className="inline-flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold px-3.5 py-1.5 rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImg ? 'Mengunggah...' : 'Pilih & Unggah Gambar Baru'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (url) =>
                          setContents((prev) => ({
                            ...prev,
                            potensiDesa: { ...prev.potensiDesa, imageUrl: url },
                          }))
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Teks Penjelasan Potensi Desa */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Teks Penjelasan Lengkap (Di Bawah Gambar)</label>
              <textarea
                rows={6}
                value={contents.potensiDesa.content}
                onChange={(e) =>
                  setContents((prev) => ({
                    ...prev,
                    potensiDesa: { ...prev.potensiDesa, content: e.target.value },
                  }))
                }
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 leading-relaxed"
                placeholder="Tuliskan penjelasan detail potensi dan keunggulan Desa Siberobah..."
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: BERANDA */}
      {activeTab === 'home' && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Edit Banner Beranda Utama</h3>
              <p className="text-xs text-slate-500 mt-1">Ubah judul hero banner dan teks pengantar halaman depan.</p>
            </div>
            <button
              onClick={() => handleSaveContent('home')}
              disabled={saving}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Banner Beranda'}</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Judul Hero Banner</label>
              <input
                type="text"
                value={contents.home.heroTitle}
                onChange={(e) =>
                  setContents((prev) => ({
                    ...prev,
                    home: { ...prev.home, heroTitle: e.target.value },
                  }))
                }
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Hero Banner</label>
              <textarea
                rows={3}
                value={contents.home.heroSubtitle}
                onChange={(e) =>
                  setContents((prev) => ({
                    ...prev,
                    home: { ...prev.home, heroSubtitle: e.target.value },
                  }))
                }
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
