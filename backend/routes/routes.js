//const express = require("express");
import express from "express";
import testGet from "../controllers/controller.js";
import signUp from "../controllers/signup.js";

const router = express.Router();

router.get("/test", testGet);
router.post("/signup", signUp);

export default router;