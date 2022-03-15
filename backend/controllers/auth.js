import {ddbClient} from "../database/index.js";
import {QueryCommand} from "@aws-sdk/client-dynamodb";
import {isValidPassword, SECRET_KEY} from "../utils/auth.js";
import jwt from "jsonwebtoken";

export const login = async (request, response) => {
    const {email, password} = request.body;
    if (!(email && password)) {
        return response.status(400).send({data: "Email or Password is missing"});
    }

    const queryParams = {
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: {
            ":e": {S: email},
        },
        ProjectionExpression: "id, email, password, password_salt",
        TableName: "user",
    };

    const data = await ddbClient.send(new QueryCommand(queryParams));
    if (!data.Items.length) {
        return response.status(400).send({data: "Email doesn't exists"});
    }

    const item = data.Items[0];

    if (email === item.email.S && isValidPassword(password, item.password.S, item.password_salt.S)) {
        const token = jwt.sign(
            {user_id: item.id.S, email},
            SECRET_KEY
        );
        data.Items = [{token, id: item.id.S, email}];
        return response.send(data);
    }
    return response.status(400).send({data: "Invalid credentials"});
}
