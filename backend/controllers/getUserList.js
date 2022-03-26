import { ddbClient } from "../database/index.js";
import { GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";

const getUsers = async (request, response) => {
  const params = {
    TableName: "user",
  };

  try {
    console.log("trying");
    const command = new ScanCommand(params);
    const data = await ddbClient.send(command);
    console.log("tried");
    //console.log("Success", data.Item);
    return data;
  } catch (error) {
    return error;
  }
};

export default getUsers;
