/**
 * Exits the Pokedex application gracefully.
 * @param state - Application state containing readline interface
 */
export function commandExit(state) {
    console.log("Closing the Pokedex... Goodbye!");
    state.rl.close();
    process.exit(0);
}
