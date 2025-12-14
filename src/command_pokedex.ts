import type { State } from "./state.js";

/**
 * Lists all Pokemon in the user's Pokedex.
 * @param state - Application state containing the Pokedex
 */
export async function commandPokedex(state: State): Promise<void> {
  console.log("Your Pokedex:");
  for (const pokemonName in state.pokedex) {
    console.log(` - ${pokemonName}`);
  }
}
