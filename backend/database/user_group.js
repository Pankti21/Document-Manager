import {ddbClient, ProvisionedThroughput} from "./index.js";
import {CreateTableCommand} from "@aws-sdk/client-dynamodb";

const params = {
    TableName: "user_group",
    KeySchema: [
        {AttributeName: "user_id", KeyType: "HASH"},
        {AttributeName: "group_id", KeyType: "RANGE"}
    ],
    AttributeDefinitions: [
        {AttributeName: "user_id", AttributeType: "N"},
        {AttributeName: "group_id", AttributeType: "N"}
    ],
    GlobalSecondaryIndexes: [
        {
            IndexName: "user_group_index", KeySchema: [
                {AttributeName: "user_id", KeyType: "HASH"},
                {AttributeName: "group_id", KeyType: "RANGE"}
            ],
            Projection: {
                ProjectionType: 'ALL',
            },
            ProvisionedThroughput: {...ProvisionedThroughput}
        }
    ],
    ProvisionedThroughput: {...ProvisionedThroughput}
};

export const createGroupTable = async () => {
    try {
        return await ddbClient.send(new CreateTableCommand(params));
    } catch (err) {
        console.log("Error", err);
    }
}

createGroupTable();