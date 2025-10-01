import { Command } from "commander"; // Used to create the command-line interface

const program = new Command();

program
    .name("basic-cli")
    .description("A simple CLI using only Commander.")
    .version("1.0.0");

// Define the 'process' command
program
    .command("process")
    .argument(
        "<input-string>",
        'The string input to process (e.g., "hello-world")'
    )
    .description("Receives an input string and confirms receipt.")
    .action((inputString: string) => {
        try {
            console.log(`\nCommander CLI received input: "${inputString}"`);

            console.log(`\n✅ Processing Successful!`);
            console.log(`   Input Length: ${inputString.length} characters.`);
        } catch (error) {
            console.error(`\n❌ An unexpected error occurred: ${error}`);
            // Exit with a non-zero code to indicate command failure
            process.exit(1);
        }
    });

// Parse the arguments and execute the command
program.parse(process.argv);
