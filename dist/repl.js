/**
 * Cleans and normalizes user input by trimming whitespace,
 * converting to lowercase, and splitting into words.
 * @param input - Raw user input string
 * @returns Array of lowercase words with whitespace removed
 */
export function cleanInput(input) {
    return input.trim().toLowerCase().split(/\s+/);
}
/**
 * Starts the interactive REPL (Read-Eval-Print Loop) for the Pokedex CLI.
 * @param state - Application state containing readline interface and commands
 */
export function startREPL(state) {
    state.rl.prompt();
    state.rl.on("line", async (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            state.rl.prompt();
            return;
        }
        const commandName = words[0];
        const args = words.slice(1);
        const command = state.commands[commandName];
        if (command) {
            try {
                await command.callback(state, ...args);
            }
            catch (error) {
                console.error(`Error executing command: ${error}`);
            }
        }
        else {
            console.log("Unknown command");
        }
        state.rl.prompt();
    });
}
