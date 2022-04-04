import express from "express";
import signUp from "../controllers/signup.js";
import createGroup from "../controllers/createGroup.js";
import {validateToken} from "../middleware/auth.js";
import {
    addFileController,
    downloadFileController,
    listFilesController,
    viewFileController,
    analyzeFileWithTextractController
} from "../controllers/fileController.js";
import getUsers from "../controllers/getUserList.js";
import getGroups from "../controllers/getGroups.js";
import getGroupFiles from "../controllers/getGroupFiles.js";
import getGroupUsers from "../controllers/getGroupUsers.js";
import getNonGroupUsers from "../controllers/getNonGroupUsers.js";
import updateGroupUsers from "../controllers/updateGroupUsers.js";
import { getCurrentUser, login } from "../controllers/auth.js";
import { downloadGroupFileController, getGroupFileURLController, viewGroupFileController } from "../controllers/GroupFileController.js";

const router = express.Router();

// router.get("/test", testGet);
router.post("/signup", signUp);
router.post("/creategroup", validateToken, createGroup);
router.post("/login", login);
router.get("/current-user", validateToken, getCurrentUser);

router.get("/getuserlist", validateToken, getUsers);
router.post("/getgroups", validateToken, getGroups);
// router.get("/getgroups", validateToken, getGroups);
// router.get("/getgroups", validateToken, getGroups);
// router.get("/getgroups", validateToken, getGroups);
router.get("/getgroupfiles/:id", validateToken, getGroupFiles);
router.get("/getgroupusers/:id", validateToken, getGroupUsers);
router.get("/getnongroupusers/:id", validateToken, getNonGroupUsers);
router.post("/updategroupusers/:id", validateToken, updateGroupUsers);

//router.post("/logout", validateToken, logout);

router.post("/files", listFilesController);
router.post("/upload", addFileController);
router.get("/view/:id", viewFileController);
router.get("/download/:id", downloadFileController);
router.get("/analyze/:groupId/:id", analyzeFileWithTextractController);
router.get("/view/:group/:id", viewGroupFileController);
router.get("/download/:group/:id", downloadGroupFileController);
router.get("/geturl/:group/:id", getGroupFileURLController);
//router.get("/getshortenurl/:group/:id", getGroupFileURLController);

export default router;
