import {v4} from "uuid";

import FileUploader from "../utils/fileUploadService.js";

import {addGroupFile, readFileUrl, readGroupFiles} from "../database/group_file.js";

export const listFilesController = async (req, res) => {
    const allFiles = await readGroupFiles();

    const filesFormatted = allFiles.map((file) => {
        return {
            id: file.file_id,
            fileName: file.file_name,
        };
    });

    res.status(200).send(filesFormatted);
};

export const addFileController = async (req, res) => {
    try {
        //console.log(req);
        // get form data from request
        const file = req.files.file;
        const name = file.name;
        const body = file.data;
        const contentType = file.mimetype;
        let groupId;

        if (req.body.groupId) {
            groupId = req.body.groupId;
        }

        // upload the file and get uploaded file name
        const uploader = new FileUploader();
        const {url, key} = await uploader.createFileOnS3(name, body, contentType);

        // generate a unique id
        const id = v4();

        // change for inserting into db
        const fileRecord = {
            file_id: id,
            file_name: name,
            file_url: url,
            file_key: key,
            group_id: groupId,
            permission: true,
        };

        await addGroupFile(fileRecord);

        res.status(200).send(fileRecord);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error, please try again.");
    }
};

export const viewFileController = async (req, res) => {
    try {
        const id = req.params.id;

        const fileUrlResponse = await readFileUrl({
            file_id: id,
            group_id: "3658921648704060516",
        });

        if (!fileUrlResponse || !fileUrlResponse.file_key) {
            res.status(404).send("Not found");
        }

        const key = fileUrlResponse.file_key;
        console.log(key);
        const fileService = new FileUploader();
        const stream = await fileService.getFileStream(key);
        stream.pipe(res);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error!");
    }
};

export const downloadFileController = async (req, res) => {
    try {
        const id = req.params.id;

        const fileUrlResponse = await readFileUrl(
            {
                file_id: id,
                group_id: "image-group",
            },
            true
        );

        if (!fileUrlResponse || !fileUrlResponse.file_key) {
            res.status(404).send("Not found");
        }

        const key = fileUrlResponse.file_key;
        console.log(key);
        const fileService = new FileUploader();
        const stream = await fileService.getFileStream(key);
        res.set("Content-Disposition", `attachment; filename="${fileUrlResponse.file_name}"`);
        stream.pipe(res);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error!");
    }
};
