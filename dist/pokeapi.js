/**
 * Client for interacting with the PokeAPI.
 */
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    #cache;
    /**
     * Creates a new PokeAPI client with caching.
     * @param cache - Cache instance for storing API responses
     */
    constructor(cache) {
        this.#cache = cache;
    }
    /**
     * Fetches a paginated list of location areas.
     * @param pageURL - Optional URL for a specific page of results
     * @returns Paginated location area data
     */
    async fetchLocations(pageURL) {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;
        const cached = this.#cache.get(url);
        if (cached) {
            console.log("Using cached data");
            return cached;
        }
        console.log("Fetching from API...");
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.#cache.add(url, data);
        return data;
    }
    /**
     * Fetches detailed information about a specific location area.
     * @param locationName - Name of the location area
     * @returns Detailed location area data
     */
    async fetchLocation(locationName) {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const cached = this.#cache.get(url);
        if (cached) {
            console.log("Using cached data");
            return cached;
        }
        console.log("Fetching from API...");
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.#cache.add(url, data);
        return data;
    }
    /**
     * Fetches detailed information about a specific Pokemon.
     * @param pokemonName - Name of the Pokemon
     * @returns Detailed Pokemon data
     */
    async fetchPokemon(pokemonName) {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
        const cached = this.#cache.get(url);
        if (cached) {
            console.log("Using cached data");
            return cached;
        }
        console.log("Fetching from API...");
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.#cache.add(url, data);
        return data;
    }
}
