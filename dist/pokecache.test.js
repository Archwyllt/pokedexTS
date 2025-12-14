import { describe, expect, test, beforeEach, afterEach } from "vitest";
import { Cache } from "./pokecache.js";
describe("Cache", () => {
    let cache;
    beforeEach(() => {
        cache = new Cache(1000);
    });
    afterEach(() => {
        cache.stopReapLoop();
    });
    test("add and get a value", () => {
        cache.add("key1", "value1");
        const result = cache.get("key1");
        expect(result).toBe("value1");
    });
    test("get returns undefined for missing key", () => {
        const result = cache.get("nonexistent");
        expect(result).toBeUndefined();
    });
    test("cache stores different types", () => {
        cache.add("string", "hello");
        cache.add("number", 42);
        cache.add("object", { name: "test" });
        expect(cache.get("string")).toBe("hello");
        expect(cache.get("number")).toBe(42);
        expect(cache.get("object")).toEqual({ name: "test" });
    });
    test("reap removes old entries", async () => {
        const shortCache = new Cache(100);
        shortCache.add("key1", "value1");
        expect(shortCache.get("key1")).toBe("value1");
        await new Promise((resolve) => setTimeout(resolve, 150));
        expect(shortCache.get("key1")).toBeUndefined();
        shortCache.stopReapLoop();
    });
    test("multiple entries persist until expiration", () => {
        cache.add("key1", "value1");
        cache.add("key2", "value2");
        cache.add("key3", "value3");
        expect(cache.get("key1")).toBe("value1");
        expect(cache.get("key2")).toBe("value2");
        expect(cache.get("key3")).toBe("value3");
    });
});
