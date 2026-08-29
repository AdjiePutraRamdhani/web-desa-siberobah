'use client';

import { Share2 } from 'lucide-react';

export default function ShareButton({ title }: { title: string }) {
  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({ title, url: window.location.href }).catch(() => {});
    } else if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('Tautan artikel berhasil disalin!');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
    >
      <Share2 className="w-4 h-4" />
      Bagikan Artikel
    </button>
  );
}
