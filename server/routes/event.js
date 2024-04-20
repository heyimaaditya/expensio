//PREFIX ROUTE   /event

import express from "express";
import { addEvent, getAllEvents } from "../controllers/eventController.js";

const router = express.Router();

router.post("/add", addEvent);
router.get("/all", getAllEvents);

export default router;
