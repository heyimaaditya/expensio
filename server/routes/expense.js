//ALL CONTROLLERS IN THIS ROUTE ARE PROTECTED BY AUTHORIZE USER IN THE MAIN.JS FILE

//PREFIX ROUTE   /expense

import express from "express";
import {
	addExpense,
	addExpenseThroughText,
	expenseTest,
	getExpenses,
	getExpenseById
} from "../controllers/expenseController.js";

const router = express.Router();

router.get("/", getExpenses);
router.get("/test", expenseTest);
router.post("/add", addExpense);
router.post("/add/text", addExpenseThroughText);
router.post("/expense/${id}",getExpenseById)
export default router;
