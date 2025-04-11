import express from "express";

import { login } from "../controller/loginController.js";

const router = express.Router();

// router.route("/info").get(getInfo);
router.route("/login").post(login);

export default router;
