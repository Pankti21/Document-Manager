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
import getUsers from "../controllers/getUserList.js";

const router = express.Router();

router.get("/test", testGet);
router.post("/signup", signUp);
router.post("/creategroup", createGroup);
router.post("/login", login);

router.get("/files", validateToken, listFilesController);
router.post("/upload", validateToken, addFileController);
router.get("/view/:id", viewFileController);
router.get("/download/:id", downloadFileController);
router.post("/getuserlist", getUsers);
//router.post("/logout", validateToken, logout);

export default router;
