import {ddbClient} from "../database/index.js";
import {PutItemCommand} from "@aws-sdk/client-dynamodb";
import {getHashedPassword} from "../utils/auth.js";
import { v4 as uuidv4 } from 'uuid';

const createGroup = async (request, response) => {
    const {body} = request;
    const userValid = false;
    const timestamp = new Date().getTime();

    const params = {
        TableName: "group",
        Item: {
            id: {S: parseInt(uuidv4()) + "" + timestamp},
            name: {S: body.name},
            user_id: {S: body.id},
            admin_ind: {S: body.userId},
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

export default createGroup;
  