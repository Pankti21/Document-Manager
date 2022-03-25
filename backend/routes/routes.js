import express from "express";
import testGet from "../controllers/controller.js";
import signUp from "../controllers/signup.js";
import createGroup from "../controllers/createGroup.js";
import getUsers from "../controllers/getUserList.js";
("../controllers/getUserList");
import { login } from "../controllers/auth.js";
import { validateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/test", testGet);
router.post("/signup", signUp);
router.post("/creategroup", createGroup);
router.post("/login", login);
//router.post("/logout", validateToken, logout);
router.get("/getusers", getUsers);

export default router;
