import { createInterface, type Interface } from "readline";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";
import { Cache } from "./pokecache.js";

/**
 * Represents a CLI command with its metadata and execution logic.
 */
export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
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
  pokedex: Record<string, Pokemon>;
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
    explore: {
      name: "explore",
      description: "Explore a location area to find Pokemon",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Attempt to catch a Pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "View details of a caught Pokemon",
      callback: commandInspect,
    },
  };

  const cache = new Cache(60000);
  const pokeapi = new PokeAPI(cache);

  return {
    rl,
    commands,
    pokeapi,
    nextLocationsURL: null,
    prevLocationsURL: null,
    pokedex: {},
  };
}
