/**
 * Displays the previous 20 location areas in the Pokemon world.
 * @param state - Application state containing API client and pagination state
 */
export async function commandMapB(state) {
    if (!state.prevLocationsURL) {
        console.log("you're on the first page");
        return;
    }
    const data = await state.pokeapi.fetchLocations(state.prevLocationsURL);
    for (const location of data.results) {
        console.log(location.name);
    }
    state.nextLocationsURL = data.next;
    state.prevLocationsURL = data.previous;
}
