import express from "express";
import testGet from "../controllers/controller.js";
import signUp from "../controllers/signup.js";
import createGroup from "../controllers/createGroup.js";
import {login, logout} from "../controllers/auth.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

router.get("/test", testGet);
router.post("/signup", signUp);
router.post("/create-group", verifyToken, createGroup);
router.post("/login", login);
router.post("/logout", logout);

export default router;