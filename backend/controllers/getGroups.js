import { ddbClient } from "../database/index.js";
import { GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
//import getGroupFiles from "../controllers/getGroupFiles";

const getGroups = async (request, response) => {
  const params = {
    TableName: "group",
  };

  try {
    console.log("trying");
    const command = new ScanCommand(params);
    const data = await ddbClient.send(command);
    console.log("tried");
    return response.send(data.Items);
  } catch (error) {
    return error;
  }
};

export default getGroups;
