import {ddbClient, ProvisionedThroughput} from "./index.js";
import {CreateTableCommand} from "@aws-sdk/client-dynamodb";

const params = {
    TableName: "group",
    KeySchema: [{AttributeName: "id", KeyType: "HASH"}],
    AttributeDefinitions: [
        {AttributeName: "id", AttributeType: "N"}
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