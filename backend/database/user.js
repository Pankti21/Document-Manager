import {DynamoDB, ProvisionedThroughput} from "./index";

const createUserTable = () => {
    const params = {
        TableName: "user",
        KeySchema: [{AttributeName: "id", KeyType: "HASH"}],
        AttributeDefinitions: [{AttributeName: "id", AttributeType: "N"}],
        ...ProvisionedThroughput
    };

    DynamoDB.createTable(params, function (err, data) {
        if (err) {
            console.error("Unable to create table", err);
        } else {
            console.log("Created table", data);
        }
    });
}

module.exports = {
    createUserTable
}