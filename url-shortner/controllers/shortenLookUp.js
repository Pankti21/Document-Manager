import { ddbClient } from "../database/index.js";
import { PutItemCommand, QueryCommand, CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";
import shortid from "shortid";
import { generateId, createEntry } from "../database/shortner.js";

export const shortenLookUp = async (request, response) => {
  const shortId = request.params.shortendId;
  let data;
  console.log(shortId);
  const queryParams = {
    KeyConditionExpression: "shortend_id = :id",
    ExpressionAttributeValues: {
      ":id": { S: shortId },
    },
    ProjectionExpression: "#orig_url, shortend_url",
    TableName: "shortened_url",
    ExpressionAttributeNames: {
      "#orig_url": "url",
    },
  };

  try {
    console.log("trying");
    data = await ddbClient.send(new QueryCommand(queryParams));

    if (data.Items.length === 0) {
      return response.status(400).send({ data: "No such shortend url found" });
    }
    console.log("tried");
    //console.log(data.Items.data);
    console.log(data.Items[0].url.S);
    //return response.send(data.Items);
    return response
      .writeHead(301, {
        Location: data.Items[0].url.S,
      })
      .end();
  } catch (error) {
    console.log(error);
    return error;
  }
};
