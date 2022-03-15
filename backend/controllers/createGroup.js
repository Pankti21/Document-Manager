import {ddbClient} from "../database/index.js";
import {PutItemCommand} from "@aws-sdk/client-dynamodb";
import {v4 as uuidv4} from 'uuid';

const createGroup = async (request, response) => {
    const {body} = request;
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
        return response.send(data);
    } catch (error) {
        return error;
    }
};

export default createGroup;
  