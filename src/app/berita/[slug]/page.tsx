import Link from 'next/link';
import { notFound } from 'next/navigation';
import MotionWrapper from '@/components/MotionWrapper';
import ShareButton from '@/components/ShareButton';
import { INITIAL_NEWS, NewsItem } from '@/lib/data';
import { getNewsBySlugStore, getNewsStore } from '@/lib/newsStore';
import { prisma } from '@/lib/db';
import { ArrowLeft, Calendar, User, Eye, Tag, BookOpen } from 'lucide-react';

export default async function DetailBeritaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let article: NewsItem | null = null;
  let allNews: NewsItem[] = [];

  if (prisma) {
    try {
      const dbArticle = await prisma.news.findUnique({
        where: { slug },
      });
      if (dbArticle) {
        article = {
          id: dbArticle.id,
          title: dbArticle.title,
          slug: dbArticle.slug,
          snippet: dbArticle.snippet,
          content: dbArticle.content,
          category: dbArticle.category,
          imageUrl: dbArticle.imageUrl || '/hero.jpg',
          author: dbArticle.author,
          views: dbArticle.views,
          date: dbArticle.createdAt ? new Date(dbArticle.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        };
      }

      const dbAll = await prisma.news.findMany({
        orderBy: { createdAt: 'desc' },
      });
      if (dbAll && dbAll.length > 0) {
        allNews = dbAll.map((item: any) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          snippet: item.snippet,
          content: item.content,
          category: item.category,
          imageUrl: item.imageUrl || '/hero.jpg',
          author: item.author,
          views: item.views,
          date: item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        }));
      }
    } catch (e) {
      console.error('Error loading news from database:', e);
    }
  }

  if (!article) {
    article = getNewsBySlugStore(slug) || INITIAL_NEWS.find((item) => item.slug === slug) || null;
  }

  if (allNews.length === 0) {
    allNews = getNewsStore();
  }

  if (!article) {
    notFound();
  }

  const relatedArticles = allNews.filter((item) => item.id !== article.id).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white pt-16 pb-20 px-4 md:px-10 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <MotionWrapper direction="up">
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Berita</span>
            </Link>

            <div className="flex items-center gap-3 text-xs text-emerald-400 mb-4 font-semibold uppercase tracking-wider">
              <span className="bg-emerald-600/30 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white mb-6">
              {article.title}
            </h1>

            <div className="flex items-center justify-between pt-6 border-t border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                  {article.author.charAt(0)}
                </div>
                <span>Ditulis oleh <strong className="text-slate-200">{article.author}</strong></span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {article.views} Pembaca
                </span>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-10 py-12 w-full grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <MotionWrapper direction="up">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 mb-8 max-h-[450px]">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-base leading-relaxed">
              <p className="text-lg font-medium text-slate-900 leading-relaxed border-l-4 border-emerald-600 pl-4 py-1 italic bg-emerald-50/50 rounded-r-lg">
                {article.snippet}
              </p>

              {article.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}

              <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  <span>Kategori: {article.category}, Siberobah Digital, Layanan Desa</span>
                </div>
                <ShareButton title={article.title} />
              </div>
            </div>
          </MotionWrapper>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <MotionWrapper direction="left">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-lg border-b border-slate-100 pb-4">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <span>Berita Terkait</span>
              </div>

              <div className="space-y-6">
                {relatedArticles.map((rel) => (
                  <Link key={rel.id} href={`/berita/${rel.slug}`} className="block group">
                    <div className="flex gap-4 items-start">
                      <img
                        src={rel.imageUrl}
                        alt={rel.title}
                        className="w-20 h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded">
                          {rel.category}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-1 group-hover:text-emerald-700 transition-colors line-clamp-2">
                          {rel.title}
                        </h4>
                        <div className="text-xs text-slate-400 mt-1">{rel.date}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </MotionWrapper>
        </div>

      </main>
    </div>
  );
}
