/**
 * Client for interacting with the PokeAPI.
 */
export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  /**
   * Fetches a paginated list of location areas.
   * @param pageURL - Optional URL for a specific page of results
   * @returns Paginated location area data
   */
  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }

  /**
   * Fetches detailed information about a specific location area.
   * @param locationName - Name of the location area
   * @returns Detailed location area data
   */
  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
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
  pokemon_encounters: Array<unknown>;
};
