// publishers/errors_publisher/index.ts
import { MongoClient } from "mongodb";
import { z } from "zod";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

async function main() {
    // This is for dependency testing and structure validation, as requested.
    // The connection string is a placeholder ("heyhey").
    const client = new MongoClient("heyhey");
    console.log("MongoDB client dependency initialized.");

    // --- Zod Schema and Validation Example ---
    const EventSchema = z.object({
        eventName: z.string().min(5, "Name must be at least 5 characters."),
        timestamp: z.string().refine(
            // Use dayjs to validate that the string is a valid date
            (date) => dayjs(date).isValid(),
            "Invalid timestamp string."
        ),
    });

    try {
        // Successful validation test
        const validEvent = {
            eventName: "Application Started",
            timestamp: dayjs().subtract(5, "minutes").toISOString(),
        };

        const validatedEvent = EventSchema.parse(validEvent);
        console.log(
            `\nZod Validation Check: Successful! Event: ${validatedEvent.eventName}`
        );

        // --- Day.js Usage Example ---
        const eventTime = dayjs(validatedEvent.timestamp);
        console.log(`Day.js Check: The event occurred ${eventTime.fromNow()}.`);

        // This is a basic demonstration of Day.js formatting, as in the previous version
        console.log(
            `Day.js Check: Event Formatted Time: ${eventTime.format(
                "MMM D, YYYY HH:mm A"
            )}`
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
