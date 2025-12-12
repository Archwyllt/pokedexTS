import { createInterface } from "readline";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
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
    };
    return { rl, commands };
}
