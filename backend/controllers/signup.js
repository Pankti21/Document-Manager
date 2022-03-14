import {ddbClient} from "../database/index.js";
import {PutItemCommand} from "@aws-sdk/client-dynamodb";
import {getHashedPassword} from "../utils/auth.js";
import { v4 as uuidv4 } from 'uuid';

const signUp = async (request, response) => {
    const {body} = request;
    const passwordData = getHashedPassword(body.password);
    const timestamp = new Date().getTime();

    const params = {
        TableName: "user",
        Item: {
            id: {S: uuidv4() + "" + timestamp},
            first_name: {S: body.firstName},
            last_name: {S: body.lastName},
            email: {S: body.email},
            password: {S: passwordData.hash},
            password_salt: {S: passwordData.salt}
        },
    };

    try {
        const data = await ddbClient.send(new PutItemCommand(params));
        response.send(data);
    } catch (error) {
        console.log(error);
        return error;
    }
};

export default signUp;
  