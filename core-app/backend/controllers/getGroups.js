import {ddbClient} from "../database/index.js";
import {ScanCommand} from "@aws-sdk/client-dynamodb";
//import getGroupFiles from "../controllers/getGroupFiles";

const getGroups = async (request, response) => {
    console.log("request: ", request.body);
    const currentUserId = request.body.currentUserId;
    const params = {
        FilterExpression: "contains (user_id, :id)",
        ExpressionAttributeValues: {
            ":id": {S: currentUserId},
        },
        TableName: "group",
    };

    try {
        console.log("trying");
        const command = new ScanCommand(params);
        const data = await ddbClient.send(command);
        //console.log("tried: ", data.Items);
        if (data.Items.length === 0) {
            return response.status(400).send({data: "You have no groups"});
        }
        return response.send(data.Items);
    } catch (error) {
        console.log(error);
        return error;
    }
};

export default getGroups;
