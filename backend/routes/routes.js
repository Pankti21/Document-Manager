import express from "express";
import testGet from "../controllers/controller.js";
import signUp from "../controllers/signup.js";
import createGroup from "../controllers/createGroup.js";
import { validateToken } from "../middleware/auth.js";
import { listFilesController, addFileController, downloadFileController, viewFileController } from "../controllers/fileController.js";
import getUsers from "../controllers/getUserList.js";
import getGroups from "../controllers/getGroups.js";
import getGroupFiles from "../controllers/getGroupFiles.js";
import getGroupUsers from "../controllers/getGroupUsers.js";
import getNonGroupUsers from "../controllers/getNonGroupUsers.js";
import updateGroupUsers from "../controllers/updateGroupUsers.js";
import { login } from "../controllers/auth.js";
import { viewGroupFileController, downloadGroupFileController, getGroupFileURLController } from "../controllers/GroupFileController.js";

const router = express.Router();

router.get("/test", testGet);
router.post("/signup", signUp);
router.post("/creategroup", validateToken, createGroup);
router.post("/login", login);
router.get("/getuserlist", getUsers);
router.get("/getgroups", getGroups);
router.get("/getgroupfiles/:id", getGroupFiles);
router.get("/getgroupusers/:id", getGroupUsers);
router.get("/getnongroupusers/:id", getNonGroupUsers);
router.post("/updategroupusers/:id", updateGroupUsers);

//router.post("/logout", validateToken, logout);

router.get("/files", validateToken, listFilesController);
router.post("/upload", validateToken, addFileController);
router.get("/view/:id", viewFileController);
router.get("/download/:id", downloadFileController);
router.get("/view/:group/:id", viewGroupFileController);
router.get("/download/:group/:id", downloadGroupFileController);
router.get("/geturl/:group/:id", getGroupFileURLController);
//router.get("/getshortenurl/:group/:id", getGroupFileURLController);

export default router;
