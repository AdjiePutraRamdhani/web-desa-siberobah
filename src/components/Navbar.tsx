'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  Building2,
  Users,
  FileText,
  Landmark,
  Sparkles,
  History,
  Newspaper,
  Coins,
  MapPin,
  Heart,
  Shield,
  Flame,
  ScrollText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface NavSubmenu {
  name: string;
  href: string;
  desc?: string;
  icon?: any;
}

export interface NavItem {
  name: string;
  href?: string;
  submenus?: NavSubmenu[];
}

export const KELEMBAGAAN_SUBMENUS: NavSubmenu[] = [
  { name: 'Pemerintah Desa', href: '/kelembagaan/pemerintah', desc: 'Kepala Desa & Perangkat', icon: Building2 },
  { name: 'BPD', href: '/kelembagaan/bpd', desc: 'Badan Permusyawaratan Desa', icon: Landmark },
  { name: 'PKK', href: '/kelembagaan/pkk', desc: 'Pemberdayaan Kesejahteraan Keluarga', icon: Heart },
  { name: 'Posyandu', href: '/kelembagaan/posyandu', desc: 'Layanan Kesehatan Warga', icon: Shield },
  { name: 'BKM', href: '/kelembagaan/bkm', desc: 'Badan Keswadayaan Masyarakat', icon: Users },
  { name: 'Karang Taruna', href: '/kelembagaan/karang-taruna', desc: 'Wadah Kepemudaan Generasi Muda', icon: Flame },
  { name: 'LAD', href: '/kelembagaan/lad', desc: 'Lembaga Adat Desa & Tradisi', icon: ScrollText },
];

export const NAV_ITEMS: NavItem[] = [
  { name: 'Beranda', href: '/' },
  {
    name: 'Profil Desa',
    submenus: [
      {
        name: 'Sejarah Desa',
        href: '/sejarah',
        desc: 'Asal usul dan warisan budaya Siberobah',
        icon: History,
      },
      {
        name: 'PAD Desa',
        href: '/pad-desa',
        desc: 'Pendapatan Asli Desa dan transparansi keuangan',
        icon: Coins,
      },
      {
        name: 'Potensi Desa',
        href: '/potensi-desa',
        desc: 'Komoditas unggulan dan daya tarik wisata',
        icon: Sparkles,
      },
    ],
  },
  {
    name: 'Kelembagaan Desa',
    submenus: KELEMBAGAAN_SUBMENUS,
  },
  { name: 'Layanan', href: '/layanan' },
  { name: 'Kependudukan', href: '/kependudukan' },
  { name: 'Kabar Desa', href: '/berita' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setActiveMobileDropdown(null);
  }, [pathname]);

  return (
    <nav
      ref={navContainerRef}
      className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300"
    >
      <div className="flex justify-between items-center h-16 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          {!logoError ? (
            <img
              src="/logo.png"
              alt="Logo Desa Siberobah"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-9 h-9 bg-emerald-700 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md group-hover:bg-emerald-800 transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
          )}
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-base md:text-lg text-slate-900 tracking-tight">
              Desa <span className="text-emerald-600">Siberobah</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide">
              Kab. Kuantan Singingi
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
          {NAV_ITEMS.map((item) => {
            const hasSubmenu = Boolean(item.submenus && item.submenus.length > 0);
            const isSubmenuActive = hasSubmenu && item.submenus?.some((s) => pathname === s.href || pathname.startsWith(s.href + '/'));
            const isActive = item.href ? pathname === item.href : isSubmenuActive;
            const isMenuOpen = openDropdown === item.name;

            if (hasSubmenu) {
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => setOpenDropdown(isMenuOpen ? null : item.name)}
                    className={`inline-flex items-center gap-1.5 text-xs xl:text-sm font-semibold transition-all px-3 py-2 rounded-xl ${
                      isActive || isMenuOpen
                        ? 'text-emerald-700 bg-emerald-50/80 font-bold'
                        : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isMenuOpen ? 'rotate-180 text-emerald-600' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 mt-1.5 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50"
                      >
                        <div className="px-3 py-1.5 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {item.name}
                          </span>
                        </div>
                        <div className="space-y-1">
                          {item.submenus?.map((sub) => {
                            const isSubActive = pathname === sub.href || pathname.startsWith(sub.href + '/');
                            const IconComp = sub.icon || Building2;
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setOpenDropdown(null)}
                                className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                                  isSubActive
                                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                                    : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-700'
                                }`}
                              >
                                <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isSubActive ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-700'}`}>
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs font-semibold leading-tight">
                                    {sub.name}
                                  </div>
                                  {sub.desc && (
                                    <div className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                                      {sub.desc}
                                    </div>
                                  )}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href || '#'}
                className={`text-xs xl:text-sm font-semibold transition-all px-3 py-2 rounded-xl relative whitespace-nowrap ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50/80 font-bold'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-emerald-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Action Buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/layanan"
            className="hidden sm:inline-flex items-center justify-center bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-emerald-800 transition-all shadow-sm hover:shadow active:scale-95"
          >
            Layanan Warga
          </Link>
          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center gap-1.5 border border-slate-200/80 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-emerald-700 hover:border-emerald-300 transition-all shadow-sm active:scale-95"
            title="Portal Admin Desa Siberobah"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Admin</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-slate-200 bg-white overflow-hidden shadow-lg"
          >
            <div className="px-4 py-4 space-y-1.5 max-h-[80vh] overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const hasSubmenu = Boolean(item.submenus && item.submenus.length > 0);
                const isSubmenuActive = hasSubmenu && item.submenus?.some((s) => pathname === s.href || pathname.startsWith(s.href + '/'));
                const isActive = item.href ? pathname === item.href : isSubmenuActive;
                const isExpanded = activeMobileDropdown === item.name;

                if (hasSubmenu) {
                  return (
                    <div key={item.name} className="space-y-1">
                      <button
                        onClick={() => setActiveMobileDropdown(isExpanded ? null : item.name)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                          isActive ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-emerald-600' : 'text-slate-400'
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-3 space-y-1 border-l-2 border-emerald-200 ml-3 my-1"
                          >
                            {item.submenus?.map((sub) => {
                              const isSubActive = pathname === sub.href || pathname.startsWith(sub.href + '/');
                              const IconComp = sub.icon || Building2;
                              return (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                                    isSubActive
                                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                  }`}
                                >
                                  <IconComp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span>{sub.name}</span>
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href || '#'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 font-bold'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* Mobile Bottom Action Buttons */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 mt-2">
                <Link
                  href="/layanan"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center bg-emerald-700 text-white text-xs font-semibold py-2.5 px-3 rounded-xl shadow-sm hover:bg-emerald-800"
                >
                  Layanan Warga
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 border border-slate-200 text-slate-700 text-xs font-semibold py-2.5 px-3 rounded-xl hover:bg-slate-50"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Login Admin</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
