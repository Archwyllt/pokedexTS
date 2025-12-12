import { createInterface, type Interface } from "readline";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { PokeAPI } from "./pokeapi.js";

/**
 * Represents a CLI command with its metadata and execution logic.
 */
export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

/**
 * Global application state containing shared resources.
 */
export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
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
    map: {
      name: "map",
      description: "Display the next 20 location areas",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Display the previous 20 location areas",
      callback: commandMapB,
    },
  };

  const pokeapi = new PokeAPI();

  return {
    rl,
    commands,
    pokeapi,
    nextLocationsURL: null,
    prevLocationsURL: null,
  };
}
