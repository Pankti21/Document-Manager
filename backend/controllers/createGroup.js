import {ddbClient} from "../database/index.js";
import {PutItemCommand} from "@aws-sdk/client-dynamodb";
import {v4 as uuidv4} from "uuid";

const createGroup = async (request, response) => {
    console.log(request.body);
    const {name, user_id, user_name, userId} = request.body;
    const timestamp = new Date().getTime();

    if (!user_id) {
        return response.status(400).send({data: "User Id is missing"});
    }

    const params = {
        TableName: "group",
        Item: {
            id: {S: parseInt(uuidv4()) + "" + timestamp},
            name: {S: name},
            user_id: {S: user_id.toString()},
            user_name: {S: user_name.toString()},
            admin_ind: {S: userId.toString()},
        },
    };

    try {
        console.log("creating group");
        const data = await ddbClient.send(new PutItemCommand(params));
        console.log("created group");
        return response.send(data);
    } catch (error) {
        return error;
    }
};

export default createGroup;
