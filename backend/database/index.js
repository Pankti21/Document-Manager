const AWS = require("aws-sdk");

AWS.config.loadFromPath("../credentials.json");

export const DynamoDB = new AWS.DynamoDB();

export const ProvisionedThroughput = {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
}