import cache from 'memory-cache';

const CACHE_KEY = 'xposts';
const CACHE_TTL = 3600000;
const FAIL_TTL = 600000;
const HANDLE = 'jaxnode';
const LIMIT = 8;
const FEED_URL = `https://api.fxtwitter.com/2/profile/${HANDLE}/statuses?count=${LIMIT}`;

function shortenUrls(text) {
  return text.replace(/https?:\/\/[^\s]+/gi, (url) => {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  });
}

function normalizePost(item) {
  if (!item || item.type !== 'status' || item.replying_to) {
    return null;
  }
  const id = item.id;
  const raw = item.text || item.raw_text?.text || '';
  if (!id || !raw) {
    return null;
  }
  const createdAt = item.created_timestamp
    ? item.created_timestamp * 1000
    : Date.parse(item.created_at);
  return {
    id,
    text: shortenUrls(raw),
    url: item.url || `https://x.com/${HANDLE}/status/${id}`,
    createdAt: Number.isNaN(createdAt) ? null : createdAt
  };
}

export async function getJaxnodePosts() {
  const cached = cache.get(CACHE_KEY);
  if (cached) {
    return cached;
  }

  try {
    const res = await fetch(FEED_URL, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'JaxNodeWebsite'
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000)
    });
    if (!res.ok) {
      cache.put(CACHE_KEY, [], FAIL_TTL);
      return [];
    }
    const data = await res.json();
    const posts = Array.isArray(data.results)
      ? data.results.map(normalizePost).filter(Boolean).slice(0, LIMIT)
      : [];
    cache.put(CACHE_KEY, posts, posts.length ? CACHE_TTL : FAIL_TTL);
    return posts;
  } catch {
    cache.put(CACHE_KEY, [], FAIL_TTL);
    return [];
  }
}
