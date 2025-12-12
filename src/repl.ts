import * as readline from "readline";

/**
 * Cleans and normalizes user input by trimming whitespace,
 * converting to lowercase, and splitting into words.
 * @param input - Raw user input string
 * @returns Array of lowercase words with whitespace removed
 */
export function cleanInput(input: string): string[] {
  return input
    .trim()
    .toLowerCase()
    .split(/\s+/);
}

/**
 * Starts the interactive REPL (Read-Eval-Print Loop) for the Pokedex CLI.
 * Continuously prompts for user input, processes commands, and displays results.
 */
export function startREPL(): void {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", (input: string) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    console.log(`Your command was: ${words[0]}`);
    rl.prompt();
  });
}
