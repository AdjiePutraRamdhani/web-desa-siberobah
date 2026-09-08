'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Globe, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">

          {/* Col 1 */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              {!logoError ? (
                <img
                  src="/logo.png"
                  alt="Logo Desa Siberobah"
                  className="h-9 w-auto object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-9 h-9 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              )}
              <span className="font-bold text-xl text-white">Desa Siberobah</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Harmonisasi antara warisan budaya pedesaan dan inovasi teknologi digital untuk pelayanan publik cerdas, cepat, dan transparan.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-base">Navigasi Utama</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Desa Siberobah</Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-white transition-colors">Kabar Desa</Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-white transition-colors">Pelayanan</Link>
              </li>
              <li>
                <Link href="/kependudukan" className="hover:text-white transition-colors">Kependudukan</Link>
              </li>
              <li>
                <Link href="/sejarah" className="hover:text-white transition-colors">Sejarah Desa</Link>
              </li>
              <li>
                <Link href="/kelembagaan" className="hover:text-white transition-colors">Kelembagaan Desa</Link>
              </li>
              <li>
                <Link href="/pad-desa" className="hover:text-white transition-colors">PAD Desa</Link>
              </li>
              <li>
                <Link href="/potensi-desa" className="hover:text-white transition-colors">Potensi Desa</Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-base">Layanan Populer</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Surat Keterangan Usaha (SKU)</li>
              <li>Surat Keterangan Domisili</li>
              <li>Surat Keterangan Tidak Mampu (SKTM)</li>
              <li>Pengantar KK & KTP</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Desa Siberobah.</p>
          <p>Created by KKN DESA SIBEROBAH UIN SUSKA RIAU 2026</p>
          <div className="flex space-x-6 items-center">
            <a href="#" className="hover:text-slate-400">Kebijakan Privasi</a>
            <a href="#" className="hover:text-slate-400">Syarat & Ketentuan</a>
            <Link href="/admin" className="hover:text-emerald-400 font-medium transition-colors">
              Login Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
