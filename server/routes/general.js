//PREFIX ROUTE   /general

import express from "express";
import {
	getCurrentUserByToken,
	getFinancialSummary,
} from "../controllers/generalController.js";

const router = express.Router();

router.get("/currentUser", getCurrentUserByToken);
router.get("/summary", getFinancialSummary);

export default router;
