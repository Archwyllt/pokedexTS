/**
 * Displays the next 20 location areas in the Pokemon world.
 * @param state - Application state containing API client and pagination state
 */
export async function commandMap(state) {
    const data = await state.pokeapi.fetchLocations(state.nextLocationsURL || undefined);
    for (const location of data.results) {
        console.log(location.name);
    }
    state.nextLocationsURL = data.next;
    state.prevLocationsURL = data.previous;
}
