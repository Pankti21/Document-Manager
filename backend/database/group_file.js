import {ddbClient, ProvisionedThroughput} from "./index.js";
import {CreateTableCommand} from "@aws-sdk/client-dynamodb";

const params = {
    TableName: "group_file",
    KeySchema: [
        {AttributeName: "group_id", KeyType: "HASH"},
        {AttributeName: "file_id", KeyType: "RANGE"}
    ],
    AttributeDefinitions: [
        {AttributeName: "group_id", AttributeType: "S"},
        {AttributeName: "file_id", AttributeType: "S"}
    ],
    GlobalSecondaryIndexes: [
        {
            IndexName: "group_file_index", KeySchema: [
                {AttributeName: "file_id", KeyType: "HASH"},
                {AttributeName: "group_id", KeyType: "RANGE"}
            ],
            Projection: {
                ProjectionType: 'ALL',
            },
            ProvisionedThroughput: {...ProvisionedThroughput}
        },
        {
            IndexName: "group_url_index", KeySchema: [
                {AttributeName: "file_id", KeyType: "HASH"},
            ],
            Projection: {
                ProjectionType: 'KEYS_ONLY',
            },
            ProvisionedThroughput: {...ProvisionedThroughput}
        }
    ],
    ProvisionedThroughput: {...ProvisionedThroughput}
};

export const createGroupFileTable = async () => {
    try {
        return await ddbClient.send(new CreateTableCommand(params));
    } catch (err) {
        console.log("Error", err);
    }
}

createGroupFileTable();