import express from "express";
import testGet from "../controllers/controller.js";
import signUp from "../controllers/signup.js";
import createGroup from "../controllers/createGroup.js";
import {login} from "../controllers/auth.js";
import {validateToken} from "../middleware/auth.js";
import { listFilesController, addFileController, downloadFileController, viewFileController } from "../controllers/fileController.js";

const router = express.Router();

router.get("/test", testGet);
router.post("/signup", signUp);
router.post("/create-group", validateToken, createGroup);
router.post("/login", login);
//router.post("/logout", validateToken, logout);

router.get("/files", listFilesController);
router.post("/upload", addFileController);
router.get("/view/:id",viewFileController);
router.get("/download/:id", downloadFileController);

export default router;