//ALL CONTROLLERS IN THIS ROUTE ARE PROTECTED BY AUTHORIZE USER IN THE MAIN.JS FILE

//PREFIX ROUTE   /income

import express from "express";
import { addGoal } from "../controllers/goalController";

const router = express.Router();

router.post("/add", addGoal);

export default router;
