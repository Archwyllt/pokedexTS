import type { State } from "./state.js";

/**
 * Displays help information for all available commands.
 * @param state - Application state containing command registry
 */
export async function commandHelp(state: State): Promise<void> {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");
  console.log();

  for (const commandName in state.commands) {
    const command = state.commands[commandName];
    console.log(`${command.name}: ${command.description}`);
  }
}
