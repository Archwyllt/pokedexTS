import type { CLICommand } from "./command.js";

/**
 * Displays help information for all available commands.
 * @param commands - The command registry to generate help from
 */
export function commandHelp(commands: Record<string, CLICommand>): void {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");
  console.log();

  for (const commandName in commands) {
    const command = commands[commandName];
    console.log(`${command.name}: ${command.description}`);
  }
}
