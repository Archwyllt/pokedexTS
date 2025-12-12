import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
/**
 * Returns the registry of all available CLI commands.
 * @returns Object mapping command names to their definitions
 */
export function getCommands() {
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
