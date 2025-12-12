import { createInterface, type Interface } from "readline";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";

/**
 * Represents a CLI command with its metadata and execution logic.
 */
export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

/**
 * Global application state containing shared resources.
 */
export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
};

/**
 * Initializes and returns the application state with readline interface
 * and command registry.
 * @returns Initialized State object
 */
export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const commands: Record<string, CLICommand> = {
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

  return { rl, commands };
}
