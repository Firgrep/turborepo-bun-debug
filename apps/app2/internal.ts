import type { ChangeEvent } from "@lib/mongo-watcher";
import type { Publisher, PublishFuncParams } from "@lib/publisher";
import type { PublishMessage } from "@lib/types/src";

async function handleMongoChange(
    publisher: Publisher,
    topicName: string,
    event: ChangeEvent
): Promise<void> {
    // Prepare the message using PublishMessage interface
    const publishMessage: PublishMessage = {
        clusterName: "wolfram",
        databaseName: event.databaseName,
        collectionName: event.collectionName,
        documentId: event.change.documentKey._id,
        operationType: event.change.operationType,
    };

    // Convert PublishMessage to a JSON string
    const message = JSON.stringify(publishMessage);

    // Prepare the parameters for publishing
    const publishParams: PublishFuncParams = {
        message,
        topicName,
        enableMessageOrdering: true,
    };

    try {
        // Publish the message using your publisher instance
        const messageId = await publisher.publish(publishParams);

        // Log success message
        console.log(
            `🚚 onChange in ${event.databaseName}.${event.collectionName} with ID: ${event.change.documentKey._id} | Message ${messageId} published @ topic "${topicName}"`
        );
    } catch (publishError: any) {
        // Log error if publishing fails
        console.error(
            `❌ Error publishing to topic ${topicName}: ${publishError.message}`
        );
    }
}

export { handleMongoChange };
