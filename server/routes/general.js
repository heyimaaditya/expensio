//PREFIX ROUTE   /general

import express from "express";
import { getCurrentUserByToken } from "../controllers/generalController.js";

const router = express.Router();

router.get("/currentUser", getCurrentUserByToken);

export default router;
