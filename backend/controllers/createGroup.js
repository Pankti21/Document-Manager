import { ddbClient } from "../database/index.js";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

const createGroup = async (request, response) => {
  const { name, user_id, userId } = request.body;
  const timestamp = new Date().getTime();

  if (!user_id) {
    return response.status(400).send({ data: "User Id is missing" });
  }

  const params = {
    TableName: "group",
    Item: {
      id: { S: parseInt(uuidv4()) + "" + timestamp },
      name: { S: name },
      user_id: { S: user_id },
      admin_ind: { S: userId },
    },
  };

  try {
    const data = await ddbClient.send(new PutItemCommand(params));
    return response.send(data);
  } catch (error) {
    return error;
  }
};

export default createGroup;
