import type { State } from "./state.js";

/**
 * Attempts to catch a Pokemon with probability based on base experience.
 * @param state - Application state containing API client and Pokedex
 * @param args - Command arguments, first should be Pokemon name
 */
export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length === 0) {
    console.log("Please provide a Pokemon name");
    return;
  }

  const pokemonName = args[0];
  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const pokemon = await state.pokeapi.fetchPokemon(pokemonName);

  const catchChance = 1 - pokemon.base_experience / 255;
  const roll = Math.random();

  if (roll < catchChance) {
    console.log(`${pokemonName} was caught!`);
    console.log("You may now inspect it with the inspect command.");
    state.pokedex[pokemonName] = pokemon;
  } else {
    console.log(`${pokemonName} escaped!`);
  }
}
