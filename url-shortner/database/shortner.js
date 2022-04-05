import {ddbClient, ProvisionedThroughput} from "./index.js";
import {CreateTableCommand, PutItemCommand} from "@aws-sdk/client-dynamodb";

const params = {
    TableName: "shortened_url",
    KeySchema: [{AttributeName: "shortend_id", KeyType: "HASH"}],
    AttributeDefinitions: [{AttributeName: "shortend_id", AttributeType: "S"}],
    ProvisionedThroughput: {...ProvisionedThroughput},
};

export const createShortnerTable = async () => {
    try {
        return await ddbClient.send(new CreateTableCommand(params));
    } catch (err) {
        console.log(err);
        return err;
    }
};

export function generateId(size) {
    var generatedId = "";
    var alphaNumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var alphaNumericSize = alphaNumeric.length;
    for (let i = 0; i < size; i++) {
        generatedId += alphaNumeric.charAt(Math.floor(Math.random() * alphaNumericSize));
    }
    console.log("GenId: ", generatedId);
    return generatedId;
}

export const createEntry = async (origUrl, id, shortendUrl) => {
    const params = {
        TableName: "shortened_url",
        Item: {
            url: {S: origUrl},
            shortend_id: {S: id},
            shortend_url: {S: shortendUrl},
        },
    };

    try {
        console.log("creating entry in shorten");
        console.log(params);
        const data = await ddbClient.send(new PutItemCommand(params));
        console.log("created entry in shorten");
    } catch (error) {
        console.log(error);
        return error;
    }
};

//generateId(7);
//createShortnerTable();
