'use client';

import { useState, useEffect } from 'react';
import MotionWrapper from '@/components/MotionWrapper';
import {
  ShieldCheck,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Search,
  MessageSquare,
  Trash2,
  Filter,
  Users,
  AlertCircle,
  Lock,
  LogOut,
  User,
  Key,
  Newspaper,
  Plus,
  ExternalLink,
  Upload,
  Image,
} from 'lucide-react';
import { NewsItem } from '@/lib/data';

interface Submission {
  id: string;
  serviceTitle: string;
  name: string;
  nik: string;
  phone: string;
  purpose: string;
  status: 'Pending' | 'Diproses' | 'Selesai' | 'Ditolak';
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);

  // Active Tab: 'submissions' | 'news'
  const [mainTab, setMainTab] = useState<'submissions' | 'news'>('submissions');

  // Login Form States
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Submissions States
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // News States
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [submittingNews, setSubmittingNews] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newsFormData, setNewsFormData] = useState({
    title: '',
    category: 'Berita',
    author: 'Tim Desa Siberobah',
    imageUrl: '/hero.jpg',
    snippet: '',
    content: '',
  });

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setNewsFormData((prev) => ({ ...prev, imageUrl: data.url }));
      } else {
        alert(data.message || 'Gagal mengunggah gambar.');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat mengunggah file gambar.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Check auth session on mount
  useEffect(() => {
    const session = localStorage.getItem('siberobah_admin_session');
    if (session) {
      setIsLoggedIn(true);
    }
    setAuthChecking(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem('siberobah_admin_session', JSON.stringify(data.adminInfo));
        setIsLoggedIn(true);
        setUsernameInput('');
        setPasswordInput('');
      } else {
        setLoginError(data.message || 'Username atau Password salah.');
      }
    } catch (err) {
      setLoginError('Terjadi kesalahan jaringan.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('siberobah_admin_session');
    setIsLoggedIn(false);
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/submissions');
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNews = async () => {
    setNewsLoading(true);
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      if (data.success) {
        setNewsList(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
    } finally {
      setNewsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchSubmissions();
      fetchNews();
    }
  }, [isLoggedIn]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmissions((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
        );
      }
    } catch (err) {
      alert('Gagal mengupdate status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pengajuan ini?')) return;
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/submissions/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setSubmissions((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      alert('Gagal menghapus pengajuan.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingNews(true);
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsFormData),
      });
      const data = await res.json();
      if (data.success) {
        alert('Berita berhasil dipublikasikan!');
        setNewsFormData({
          title: '',
          category: 'Berita',
          author: 'Tim Desa Siberobah',
          imageUrl: '/hero.jpg',
          snippet: '',
          content: '',
        });
        setShowAddNewsModal(false);
        fetchNews();
      } else {
        alert(data.message || 'Gagal menambahkan berita.');
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan saat mempublikasikan berita.');
    } finally {
      setSubmittingNews(false);
    }
  };

  const handleDeleteNews = async (slug: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) return;
    try {
      const res = await fetch(`/api/news/${slug}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setNewsList((prev) => prev.filter((item) => item.slug !== slug));
      }
    } catch (err) {
      alert('Gagal menghapus berita.');
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  // --- UNAUTHENTICATED LOGIN SCREEN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <MotionWrapper direction="up" className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Login Admin Desa</h2>
            <p className="text-slate-500 text-xs mt-1">Masukkan kredensial pengurus Balai Desa Siberobah.</p>
          </div>

          {loginError && (
            <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Username Admin</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  required
                  type="text"
                  placeholder="admin"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loginLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Memverifikasi...</span>
                  </>
                ) : (
                  <span>Masuk Ke Dashboard</span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400">
            Default credentials: <strong className="text-slate-600">admin</strong> / <strong className="text-slate-600">admin123</strong>
          </div>
        </MotionWrapper>
      </div>
    );
  }

  // --- AUTHENTICATED ADMIN DASHBOARD ---
  const totalCount = submissions.length;
  const pendingCount = submissions.filter((s) => s.status === 'Pending').length;
  const inProgressCount = submissions.filter((s) => s.status === 'Diproses').length;
  const completedCount = submissions.filter((s) => s.status === 'Selesai').length;

  const filteredSubmissions = submissions.filter((item) => {
    const matchesStatus = activeStatus === 'Semua' || item.status === activeStatus;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nik.includes(searchQuery) ||
      item.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 text-slate-800">
      
      {/* Top Admin Header */}
      <header className="bg-slate-900 text-white py-10 px-4 md:px-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Portal Kelola Desa</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Dashboard Admin <span className="text-emerald-400">Siberobah</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Pusat kelola layanan publik warga dan publikasi berita/pengumuman desa.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fetchSubmissions();
                fetchNews();
              }}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow"
            >
              <RefreshCw className={`w-4 h-4 ${loading || newsLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-10 py-10 w-full space-y-8">
        
        {/* Main Section Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-4 text-sm font-bold">
          <button
            onClick={() => setMainTab('submissions')}
            className={`pb-4 flex items-center gap-2 border-b-2 transition-all ${
              mainTab === 'submissions'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Pengajuan Surat Warga ({totalCount})</span>
          </button>

          <button
            onClick={() => setMainTab('news')}
            className={`pb-4 flex items-center gap-2 border-b-2 transition-all ${
              mainTab === 'news'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>Kelola Berita & Pengumuman ({newsList.length})</span>
          </button>
        </div>

        {/* --- TAB 1: SERVICE SUBMISSIONS --- */}
        {mainTab === 'submissions' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <MotionWrapper direction="up" delay={0.05}>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{totalCount}</div>
                    <div className="text-xs text-slate-500 font-medium">Total Pengajuan</div>
                  </div>
                </div>
              </MotionWrapper>

              <MotionWrapper direction="up" delay={0.1}>
                <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-amber-600">{pendingCount}</div>
                    <div className="text-xs text-slate-500 font-medium">Menunggu (Pending)</div>
                  </div>
                </div>
              </MotionWrapper>

              <MotionWrapper direction="up" delay={0.15}>
                <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{inProgressCount}</div>
                    <div className="text-xs text-slate-500 font-medium">Sedang Diproses</div>
                  </div>
                </div>
              </MotionWrapper>

              <MotionWrapper direction="up" delay={0.2}>
                <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">{completedCount}</div>
                    <div className="text-xs text-slate-500 font-medium">Selesai</div>
                  </div>
                </div>
              </MotionWrapper>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {['Semua', 'Pending', 'Diproses', 'Selesai', 'Ditolak'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setActiveStatus(st)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeStatus === st
                        ? 'bg-emerald-700 text-white shadow'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari Nama, NIK, atau Surat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                />
              </div>
            </div>

            {/* Table List */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {loading ? (
                <div className="p-12 text-center text-slate-500 font-medium space-y-2">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-emerald-600" />
                  <p>Memuat daftar pengajuan...</p>
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="p-12 text-center text-slate-500 space-y-2">
                  <AlertCircle className="w-8 h-8 mx-auto text-slate-400" />
                  <p className="font-semibold text-slate-700">Belum ada pengajuan surat.</p>
                  <p className="text-xs">Tidak ditemukan pengajuan dengan kriteria pencarian saat ini.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold border-b border-slate-200 tracking-wider">
                        <th className="py-4 px-6">Waktu & Jenis Surat</th>
                        <th className="py-4 px-6">Pemohon & NIK</th>
                        <th className="py-4 px-6">Keperluan</th>
                        <th className="py-4 px-6">Status Pengajuan</th>
                        <th className="py-4 px-6 text-right">Aksi & Kontak</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredSubmissions.map((item) => {
                        const formattedDate = new Date(item.createdAt).toLocaleString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        });

                        const cleanPhone = item.phone.replace(/[^0-9]/g, '');
                        const waLink = `https://wa.me/${cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone}?text=Halo%20Sdr/i%20${encodeURIComponent(item.name)},%20mengenai%20pengajuan%20${encodeURIComponent(item.serviceTitle)}%20Anda...`;

                        return (
                          <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                            
                            {/* Service & Time */}
                            <td className="py-4 px-6 align-top space-y-1">
                              <div className="font-bold text-slate-900 text-sm">{item.serviceTitle}</div>
                              <div className="text-[11px] text-slate-400">{formattedDate}</div>
                            </td>

                            {/* Applicant Name & NIK */}
                            <td className="py-4 px-6 align-top space-y-1">
                              <div className="font-bold text-slate-900">{item.name}</div>
                              <div className="text-[11px] text-slate-500 font-mono">NIK: {item.nik}</div>
                            </td>

                            {/* Purpose */}
                            <td className="py-4 px-6 align-top max-w-xs text-slate-600 leading-relaxed">
                              <p className="line-clamp-3">{item.purpose}</p>
                            </td>

                            {/* Status Switcher */}
                            <td className="py-4 px-6 align-top">
                              <select
                                value={item.status}
                                disabled={updatingId === item.id}
                                onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                                className={`px-3 py-1.5 rounded-xl font-bold text-xs border focus:outline-none transition-colors ${
                                  item.status === 'Pending'
                                    ? 'bg-amber-50 text-amber-700 border-amber-300'
                                    : item.status === 'Diproses'
                                    ? 'bg-blue-50 text-blue-700 border-blue-300'
                                    : item.status === 'Selesai'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                    : 'bg-rose-50 text-rose-700 border-rose-300'
                                }`}
                              >
                                <option value="Pending">⏳ Pending</option>
                                <option value="Diproses">🔄 Diproses</option>
                                <option value="Selesai">✅ Selesai</option>
                                <option value="Ditolak">❌ Ditolak</option>
                              </select>
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-6 align-top text-right space-x-2">
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors"
                                title="Hubungi via WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>WA Warga</span>
                              </a>

                              <button
                                onClick={() => handleDeleteSubmission(item.id)}
                                disabled={updatingId === item.id}
                                className="inline-flex items-center p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                title="Hapus Pengajuan"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>

                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- TAB 2: NEWS & ANNOUNCEMENTS MANAGEMENT --- */}
        {mainTab === 'news' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Kelola Berita & Pengumuman Desa</h3>
                <p className="text-xs text-slate-500">Tulis dan publikasikan informasi terbaru untuk warga desa.</p>
              </div>

              <button
                onClick={() => setShowAddNewsModal(true)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Tulis Berita Baru</span>
              </button>
            </div>

            {/* News Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {newsLoading ? (
                <div className="p-12 text-center text-slate-500 font-medium space-y-2">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-emerald-600" />
                  <p>Memuat daftar berita...</p>
                </div>
              ) : newsList.length === 0 ? (
                <div className="p-12 text-center text-slate-500 space-y-2">
                  <Newspaper className="w-8 h-8 mx-auto text-slate-400" />
                  <p className="font-semibold text-slate-700">Belum ada berita dipublikasikan.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold border-b border-slate-200 tracking-wider">
                        <th className="py-4 px-6">Berita / Artikel</th>
                        <th className="py-4 px-6">Kategori</th>
                        <th className="py-4 px-6">Penulis & Tanggal</th>
                        <th className="py-4 px-6 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {newsList.map((news) => (
                        <tr key={news.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-6 align-top">
                            <div className="flex gap-4 items-start">
                              <img
                                src={news.imageUrl || '/hero.jpg'}
                                alt={news.title}
                                className="w-16 h-12 object-cover rounded-lg shrink-0 border border-slate-200"
                              />
                              <div>
                                <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{news.title}</h4>
                                <p className="text-slate-500 text-xs line-clamp-2 mt-0.5">{news.snippet}</p>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-6 align-top">
                            <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-md text-[11px]">
                              {news.category}
                            </span>
                          </td>

                          <td className="py-4 px-6 align-top">
                            <div className="font-medium text-slate-800">{news.author}</div>
                            <div className="text-slate-400 text-[11px]">{news.date}</div>
                          </td>

                          <td className="py-4 px-6 align-top text-right space-x-2">
                            <a
                              href={`/berita/${news.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-xl transition-colors"
                              title="Lihat Berita"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Pratinjau</span>
                            </a>

                            <button
                              onClick={() => handleDeleteNews(news.slug)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Hapus Berita"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* --- ADD NEWS MODAL --- */}
      {showAddNewsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <MotionWrapper direction="up" className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-1">Tulis Berita Baru</h3>
            <p className="text-slate-500 text-xs mb-6">Publikasikan informasi resmi untuk warga Desa Siberobah.</p>

            <form onSubmit={handleCreateNews} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul Berita / Pengumuman</label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: Kerja Bakti Massal Menyambut Hari Kemerdekaan"
                  value={newsFormData.title}
                  onChange={(e) => setNewsFormData({ ...newsFormData, title: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={newsFormData.category}
                    onChange={(e) => setNewsFormData({ ...newsFormData, category: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none text-slate-900 font-medium bg-white"
                  >
                    <option value="Berita">Berita</option>
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Kegiatan">Kegiatan</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Penulis / Sumber</label>
                  <input
                    required
                    type="text"
                    placeholder="Tim Desa Siberobah"
                    value={newsFormData.author}
                    onChange={(e) => setNewsFormData({ ...newsFormData, author: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Gambar Header / Foto Sampul Berita</label>
                <div className="space-y-3">
                  <label className="bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-1.5 block">
                    {uploadingImage ? (
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 py-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Mengunggah File Gambar...</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-emerald-600 mb-1" />
                        <span className="text-xs font-bold text-slate-800">Pilih File Gambar dari Komputer</span>
                        <span className="text-[11px] text-slate-400">Format yang didukung: JPG, PNG, WebP</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>

                  {newsFormData.imageUrl && (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 h-40 flex items-center justify-center group">
                      <img
                        src={newsFormData.imageUrl}
                        alt="Pratinjau Gambar Berita"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-2">
                        <Image className="w-4 h-4" />
                        <span>Pratinjau Gambar Berita</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ringkasan Berita (Snippet Singkat)</label>
                <input
                  required
                  type="text"
                  placeholder="Ringkasan 1-2 kalimat untuk kartu berita..."
                  value={newsFormData.snippet}
                  onChange={(e) => setNewsFormData({ ...newsFormData, snippet: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Isi Berita Lengkap</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Tuliskan berita lengkap di sini. Gunakan baris baru untuk memisahkan paragraf..."
                  value={newsFormData.content}
                  onChange={(e) => setNewsFormData({ ...newsFormData, content: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none text-slate-900 leading-relaxed"
                ></textarea>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddNewsModal(false)}
                  disabled={submittingNews}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors disabled:opacity-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={submittingNews}
                  className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submittingNews ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Mempublikasikan...</span>
                    </>
                  ) : (
                    <span>Publikasikan Berita</span>
                  )}
                </button>
              </div>
            </form>
          </MotionWrapper>
        </div>
      )}

    </div>
  );
}
