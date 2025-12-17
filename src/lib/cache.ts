type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

const CACHE_TTL = 15 * 1000; 
const cache = new Map<string, CacheEntry<unknown>>();

export function getCache<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > CACHE_TTL;
  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return entry.data as T;
}

export function setCache<T>(key: string, data: T) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}
