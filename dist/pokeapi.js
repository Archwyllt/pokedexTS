/**
 * Client for interacting with the PokeAPI.
 */
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    /**
     * Fetches a paginated list of location areas.
     * @param pageURL - Optional URL for a specific page of results
     * @returns Paginated location area data
     */
    async fetchLocations(pageURL) {
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
    async fetchLocation(locationName) {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
}
