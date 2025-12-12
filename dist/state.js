import { createInterface } from "readline";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { PokeAPI } from "./pokeapi.js";
/**
 * Initializes and returns the application state with readline interface
 * and command registry.
 * @returns Initialized State object
 */
export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    const commands = {
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
