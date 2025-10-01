import { Command } from "commander"; // Used to create the command-line interface
import { z } from "zod"; // Used for robust input validation
import dayjs from "dayjs"; // Used for date manipulation and validation

const program = new Command();

// --- Zod Schema for CLI Input Validation ---
// Define a schema to ensure the input argument is a string that represents a valid date
const TimestampSchema = z.string().refine(
    // Refine logic uses dayjs's isValid() method
    (date) => dayjs(date).isValid(),
    "Invalid timestamp string. Please provide a valid date/time format (e.g., YYYY-MM-DD, 2024-10-25T12:00:00Z)."
);

program
    .name("dayjs-cli")
    .description("A simple CLI to test Day.js and Zod functionality.")
    .version("1.0.0");

// Define the 'validate' command
program
    .command("validate")
    .argument(
        "<timestamp>",
        'The timestamp string to validate (e.g., "2024-10-25" or "1 hour ago")'
    )
    .description(
        "Validates a timestamp string and displays its relative time and formatted output."
    )
    .action((timestamp: string) => {
        try {
            console.log(`\nAttempting to validate timestamp: "${timestamp}"`);

            // 1. Validate the input string using the Zod schema
            const validatedTimestamp = TimestampSchema.parse(timestamp);

            // 2. Create a Day.js object from the validated string
            const eventTime = dayjs(validatedTimestamp);

            console.log(`\n✅ Validation Successful!`);
            console.log(`   Day.js Object: ${eventTime.toString()}`);

            // Note: dayjs.fromNow() requires the 'relativeTime' plugin which is often necessary
            // for real-world CLI use cases, but for this basic dependency test, we'll keep it simple.

            console.log(
                `   Formatted Time: ${eventTime.format("MMM D, YYYY HH:mm A")}`
            );
        } catch (error) {
            // Handle Zod validation errors gracefully
            if (error instanceof z.ZodError) {
                console.error(
                    `\n❌ Validation Failed: ${error.errors[0].message}`
                );
                console.error(`   Received input: "${timestamp}"`);
            } else {
                console.error(`\n❌ An unexpected error occurred: ${error}`);
            }
            // Exit with a non-zero code to indicate command failure
            process.exit(1);
        }
    });

// Parse the arguments and execute the command
program.parse(process.argv);
