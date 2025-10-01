import { MongoClient } from "mongodb";
import { z } from "zod";

async function main() {
    // This is for dependency testing and structure validation, as requested.
    // The connection string is a placeholder ("heyhey").
    const client = new MongoClient("heyhey");
    console.log("MongoDB client dependency initialized.");

    // --- Zod Schema and Validation Example ---
    const EventSchema = z.object({
        eventName: z.string().min(5, "Name must be at least 5 characters."),
    });

    try {
        // Successful validation test
        const validEvent = {
            eventName: "Application Started",
        };

        const validatedEvent = EventSchema.parse(validEvent);
        console.log(
            `\nZod Validation Check: Successful! Event: ${validatedEvent.eventName}`
        );
    } catch (error) {
        // This block would run if EventSchema.parse failed
        console.error("Zod validation encountered an error:", error);
    }
}
// Start the program
main().catch((error: any) =>
    console.error(`❌ An error occurred during main execution: ${error}`)
);
