import type { Cache } from "./pokecache.js";

/**
 * Client for interacting with the PokeAPI.
 */
export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  /**
   * Creates a new PokeAPI client with caching.
   * @param cache - Cache instance for storing API responses
   */
  constructor(cache: Cache) {
    this.#cache = cache;
  }

  /**
   * Fetches a paginated list of location areas.
   * @param pageURL - Optional URL for a specific page of results
   * @returns Paginated location area data
   */
  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;

    const cached = this.#cache.get<ShallowLocations>(url);
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
  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.#cache.get<Location>(url);
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
  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    const cached = this.#cache.get<Pokemon>(url);
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

/**
 * Represents a paginated list of location areas with minimal data.
 */
export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
};

/**
 * Represents detailed information about a specific location area.
 */
export type Location = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: Array<unknown>;
  location: {
    name: string;
    url: string;
  };
  names: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  pokemon_encounters: Array<{
    pokemon: {
      name: string;
      url: string;
    };
    version_details: Array<unknown>;
  }>;
};

/**
 * Represents detailed information about a Pokemon.
 */
export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
};
