//ALL CONTROLLERS IN THIS ROUTE ARE PROTECTED BY AUTHORIZE USER IN THE MAIN.JS FILE

//PREFIX ROUTE   /category

import express from "express";
import {
  categoryTest,
  getAllCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/test", categoryTest);
export default router;
