import { v4 } from "uuid";

import FileUploader from "../utils/fileUploadService.js";

import { addGroupFile, readGroupFiles } from "../database/group_file.js";

export const listFilesController = async (req, res) => {
  const allFiles = await readGroupFiles();
  
  const filesFormatted = allFiles.map((file) => {
    return {
      id: file.file_id,
      fileName: file.file_name
    }
  });

  res.status(200).send(filesFormatted);
};

export const addFileController = async (req, res) => {
  try {
    // get form data from request
    const file = req.files.file;
    const name = file.name;
    const body = file.data;
    const contentType = file.mimetype;

    // upload the file and get uploaded file name
    const uploader = new FileUploader();
    const url = await uploader.createFileOnS3(name, body, contentType);

    // generate a unique id
    const id = v4();

    // change for inserting into db
    const fileRecord = {
      file_id: id,
      file_name: name,
      file_url: url,
      group_id: "image-group",
      permission: true
    }

    await addGroupFile(fileRecord);

    res.status(200).send(fileRecord);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error, please try again.");
  }
};
