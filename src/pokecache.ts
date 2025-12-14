/**
 * Represents a cached entry with timestamp and value.
 */
type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

/**
 * A time-based cache that automatically cleans up expired entries.
 */
export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  /**
   * Creates a new Cache instance with automatic expiration.
   * @param interval - Time in milliseconds before entries expire
   */
  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  /**
   * Adds a value to the cache with the current timestamp.
   * @param key - Cache key
   * @param val - Value to cache
   */
  add<T>(key: string, val: T): void {
    this.#cache.set(key, {
      createdAt: Date.now(),
      val,
    });
  }

  /**
   * Retrieves a value from the cache if it exists.
   * @param key - Cache key
   * @returns Cached value or undefined if not found
   */
  get<T>(key: string): T | undefined {
    const entry = this.#cache.get(key);
    return entry?.val;
  }

  /**
   * Removes expired entries from the cache.
   */
  #reap(): void {
    const now = Date.now();
    const cutoff = now - this.#interval;

    for (const [key, entry] of this.#cache.entries()) {
      if (entry.createdAt < cutoff) {
        this.#cache.delete(key);
      }
    }
  }

  /**
   * Starts the automatic cleanup loop.
   */
  #startReapLoop(): void {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  /**
   * Stops the automatic cleanup loop.
   */
  stopReapLoop(): void {
    if (this.#reapIntervalId !== undefined) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }
}
