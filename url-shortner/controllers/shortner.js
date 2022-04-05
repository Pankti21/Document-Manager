import {createEntry, generateId} from "../database/shortner.js";

export const shortner = async (req, res) => {
    const origUrl = req.body.url;

    const shortId = generateId(7);

    const shortendUrl = window.location.origin + "/" + shortId;

    createEntry(origUrl, shortId, shortendUrl);

    return res.send(shortendUrl);
};
