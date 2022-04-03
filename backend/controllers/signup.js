import { ddbClient } from "../database/index.js";
import { PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { getHashedPassword, SECRET_KEY } from "../utils/auth.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const signUp = async (request, response) => {
  try {
    const { email, firstName, lastName, password } = request.body;

    if (!email) {
      return response.status(400).send({ data: "Email is missing" });
    }

    if (!password) {
      return response.status(400).send({ data: "Password is missing" });
    }

    const queryParams = {
      KeyConditionExpression: "email = :e",
      ExpressionAttributeValues: {
        ":e": { S: email },
      },
      ProjectionExpression: "email",
      TableName: "user",
    };

    const data = await ddbClient.send(new QueryCommand(queryParams));

    if (data.Items.length) {
      return response.status(400).send({ data: "Email already exists" });
    }

    const passwordData = getHashedPassword(password);
    const timestamp = new Date().getTime();
    const id = uuidv4() + "" + timestamp;

    const params = {
      TableName: "user",
      Item: {
        id: { S: id },
        first_name: { S: firstName },
        last_name: { S: lastName },
        email: { S: email },
        password: { S: passwordData.hash },
        password_salt: { S: passwordData.salt },
      },
    };

    try {
      const data = await ddbClient.send(new PutItemCommand(params));
      const token = jwt.sign({ user_id: id, email, first_name, last_name }, SECRET_KEY);
      data.Items = [{ token, id, email }];
      return response.send(data);
    } catch (error) {
      return error;
    }
  } catch (error) {
    console.log(error);
  }
};

export default signUp;
