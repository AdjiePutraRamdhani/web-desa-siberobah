import { INITIAL_NEWS, NewsItem } from './data';

const globalForNews = globalThis as unknown as { newsMemory: NewsItem[] };

if (!globalForNews.newsMemory) {
  globalForNews.newsMemory = [...INITIAL_NEWS];
}

export function getNewsStore(): NewsItem[] {
  return [...globalForNews.newsMemory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getNewsBySlugStore(slug: string): NewsItem | undefined {
  const target = decodeURIComponent(slug).toLowerCase();
  return globalForNews.newsMemory.find(
    (item) => item.slug.toLowerCase() === target || item.id === slug
  );
}

export function addNewsStore(data: Omit<NewsItem, 'id' | 'views' | 'date'> & { date?: string; slug?: string }): NewsItem {
  const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  
  const newArticle: NewsItem = {
    id: `news-${Date.now()}`,
    title: data.title,
    slug: slug,
    snippet: data.snippet,
    content: data.content,
    category: data.category || 'Berita',
    imageUrl: data.imageUrl || '/hero.jpg',
    author: data.author || 'Admin Desa',
    views: 1,
    date: data.date || new Date().toISOString().split('T')[0],
  };

  const existingIdx = globalForNews.newsMemory.findIndex((item) => item.slug === slug);
  if (existingIdx >= 0) {
    globalForNews.newsMemory[existingIdx] = newArticle;
  } else {
    globalForNews.newsMemory.unshift(newArticle);
  }
  return newArticle;
}

export function deleteNewsStore(idOrSlug: string): boolean {
  const initialLen = globalForNews.newsMemory.length;
  globalForNews.newsMemory = globalForNews.newsMemory.filter((item) => item.id !== idOrSlug && item.slug !== idOrSlug);
  return globalForNews.newsMemory.length < initialLen;
}
