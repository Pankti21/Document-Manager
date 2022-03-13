import {ddbClient, ProvisionedThroughput} from "./index.js";
import {CreateTableCommand} from "@aws-sdk/client-dynamodb";

const params = {
    TableName: "shortened_url",
    KeySchema: [
        {AttributeName: "file_id", KeyType: "HASH"}
    ],
    AttributeDefinitions: [
        {AttributeName: "file_id", AttributeType: "N"}
    ],
    ProvisionedThroughput: {...ProvisionedThroughput}
};

export const createShortenedURLTable = async () => {
    try {
        return await ddbClient.send(new CreateTableCommand(params));
    } catch (err) {
        console.log("Error", err);
    }
}

createShortenedURLTable();