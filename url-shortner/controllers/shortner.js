import { ddbClient } from "../database/index.js";
import { v4 as uuidv4 } from "uuid";
import shortid from "shortid";
import { generateId, createEntry } from "../database/shortner.js";

export const shortner = async (req, res) => {
  console.log("Request: ", req.body);
  const origUrl = req.body.url;

  const host = "http://localhost:9000";

  const shortId = generateId(7);
  console.log(shortId);

  const shortendUrl = host + "/" + shortId;
  console.log(shortendUrl);

  createEntry(origUrl, shortId, shortendUrl);

  return res.send(shortendUrl);
};
