import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";

/**
 * Represents a CLI command with its metadata and execution logic.
 */
export type CLICommand = {
  name: string;
  description: string;
  callback: (commands: Record<string, CLICommand>) => void;
};

/**
 * Returns the registry of all available CLI commands.
 * @returns Object mapping command names to their definitions
 */
export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
  };
}
