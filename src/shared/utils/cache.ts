export interface CacheValue<T> {
  expires: number;
  value: T;
}

const cacheStore = new Map<string, CacheValue<unknown>>();

export const setCache = <T>(key: string, value: T, ttl: number): void => {
  cacheStore.set(key, {
    value,
    expires: Date.now() + ttl,
  });
};

export const getCache = <T>(key: string): T | undefined => {
  const cache = cacheStore.get(key);

  if (!cache || Date.now() >= cache.expires) {
    cacheStore.delete(key);
    return;
  }

  return cache.value as T;
};

export const deleteCache = (key: string): boolean => {
  return cacheStore.delete(key);
};

export const clearCache = (): void => {
  cacheStore.clear();
};
