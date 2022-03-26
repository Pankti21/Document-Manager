import express from "express";
import testGet from "../controllers/controller.js";
import signUp from "../controllers/signup.js";
import createGroup from "../controllers/createGroup.js";
import {login} from "../controllers/auth.js";
import {validateToken} from "../middleware/auth.js";
import {
    listFilesController,
    addFileController,
    downloadFileController,
    viewFileController
} from "../controllers/fileController.js";

const router = express.Router();

router.get("/test", testGet);
router.post("/signup", signUp);
router.post("/create-group", validateToken, createGroup);
router.post("/login", login);

router.get("/files", validateToken, listFilesController);
router.post("/upload", validateToken, addFileController);
router.get("/view/:id", validateToken, viewFileController);
router.get("/download/:id", validateToken, downloadFileController);

export default router;