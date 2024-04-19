//ALL CONTROLLERS IN THIS ROUTE ARE PROTECTED BY AUTHORIZE USER IN THE MAIN.JS FILE

//PREFIX ROUTE   /income

import express from "express";
import { addIncome, getIncome } from "../controllers/incomeController.js";

const router = express.Router();

router.get("/", getIncome);
router.post("/add", addIncome);

export default router;
