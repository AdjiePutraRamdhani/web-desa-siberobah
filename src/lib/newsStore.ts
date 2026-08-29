import { INITIAL_NEWS, NewsItem } from './data';

let newsMemory: NewsItem[] = [...INITIAL_NEWS];

export function getNewsStore(): NewsItem[] {
  return [...newsMemory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getNewsBySlugStore(slug: string): NewsItem | undefined {
  return newsMemory.find((item) => item.slug === slug);
}

export function addNewsStore(data: Omit<NewsItem, 'id' | 'views' | 'date'> & { date?: string }): NewsItem {
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

  newsMemory.unshift(newArticle);
  return newArticle;
}

export function deleteNewsStore(idOrSlug: string): boolean {
  const initialLen = newsMemory.length;
  newsMemory = newsMemory.filter((item) => item.id !== idOrSlug && item.slug !== idOrSlug);
  return newsMemory.length < initialLen;
}
