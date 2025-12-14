/**
 * A time-based cache that automatically cleans up expired entries.
 */
export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    /**
     * Creates a new Cache instance with automatic expiration.
     * @param interval - Time in milliseconds before entries expire
     */
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    /**
     * Adds a value to the cache with the current timestamp.
     * @param key - Cache key
     * @param val - Value to cache
     */
    add(key, val) {
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
    get(key) {
        const entry = this.#cache.get(key);
        return entry?.val;
    }
    /**
     * Removes expired entries from the cache.
     */
    #reap() {
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
    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }
    /**
     * Stops the automatic cleanup loop.
     */
    stopReapLoop() {
        if (this.#reapIntervalId !== undefined) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }
}
