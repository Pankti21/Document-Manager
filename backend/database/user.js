const AWS = require("aws-sdk");

AWS.config.loadFromPath("../credentials.json");

const DynamoDB = new AWS.DynamoDB();

const createUserTable = () => {
    const params = {
        TableName: "user",
        KeySchema: [{AttributeName: "id", KeyType: "HASH"}],
        AttributeDefinitions: [{AttributeName: "id", AttributeType: "N"}],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        }
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