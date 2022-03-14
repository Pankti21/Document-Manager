import express from "express";
import testGet from "../controllers/controller.js";
import signUp from "../controllers/signup.js";
import createGroup from "../controllers/createGroup.js";

const router = express.Router();

router.get("/test", testGet);
router.post("/signup", signUp);
router.post("/creategroup", createGroup);

export default router;