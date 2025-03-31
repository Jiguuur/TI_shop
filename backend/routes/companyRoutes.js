import express from "express";

import { list } from "../controller/companyController.js";

const router = express.Router();

router.route("/list").get(list);

export default router;
