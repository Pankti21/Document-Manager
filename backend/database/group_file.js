import {ddbClient, ProvisionedThroughput} from "./index.js";
import {CreateTableCommand} from "@aws-sdk/client-dynamodb";

const params = {
    TableName: "group_file",
    KeySchema: [
        {AttributeName: "group_id", KeyType: "HASH"},
        {AttributeName: "file_id", KeyType: "RANGE"}
    ],
    AttributeDefinitions: [
        {AttributeName: "group_id", AttributeType: "N"},
        {AttributeName: "file_id", AttributeType: "N"}
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