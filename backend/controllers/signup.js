import {ddbClient} from "../database/index.js";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";

const signUp = async (req, res) => {
    var input = {
        TableName: "user",
        Item: {
          id:  req.body.id,
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
        },
      };
    console.log(req.body);
    console.log("Testing the post request");
    
    try {
    console.log("Inside try block");

    console.log("Adding a new item...");
    
    const data = await ddbClient.send(new PutItemCommand(input));
    console.log(data);
    return data;
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  };
  
  export default signUp;
  