import type { State } from "./state.js";

/**
 * Explores a location area to find Pokemon.
 * @param state - Application state containing API client
 * @param args - Command arguments, first should be location area name
 */
export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length === 0) {
    console.log("Please provide a location area name");
    return;
  }

  const locationName = args[0];
  console.log(`Exploring ${locationName}...`);

  const location = await state.pokeapi.fetchLocation(locationName);

  console.log("Found Pokemon:");
  for (const encounter of location.pokemon_encounters) {
    console.log(` - ${encounter.pokemon.name}`);
  }
}
