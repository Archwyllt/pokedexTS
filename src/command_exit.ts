import type { CLICommand } from "./command.js";

/**
 * Exits the Pokedex application gracefully.
 */
export function commandExit(_commands: Record<string, CLICommand>): void {
  console.log("Closing the Pokedex... Goodbye!");
  process.exit(0);
}
