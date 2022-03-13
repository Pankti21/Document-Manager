import {ddbClient} from "../database/index.js";
import {PutItemCommand} from "@aws-sdk/client-dynamodb";

const signUp = async (request, response) => {
    const {body} = request
    const params = {
        TableName: "user",
        Item: {
            id: {N: body.id},
            first_name: {S: body.firstName},
            last_name: {S: body.lastName},
            email: {S: body.email},
            password: {S: body.password},
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
  