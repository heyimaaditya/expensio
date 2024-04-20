//ALL CONTROLLERS IN THIS ROUTE ARE PROTECTED BY AUTHORIZE USER IN THE MAIN.JS FILE

//PREFIX ROUTE   /psycho-types

import express from "express";
import { getPsychologicalTypes } from "../controllers/psychologicalTypesController.js";

const router = express.Router();

router.get("/", getPsychologicalTypes);
export default router;
