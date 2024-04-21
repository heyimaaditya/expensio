//PREFIX ROUTE   /general

import express from "express";
import {
	getCurrentUserByToken,
	getFinancialSummary,
	getTextFromAudio,
} from "../controllers/generalController.js";
import audioUploadMiddleware from "../middleware/audioMiddleware.js";
import multer from "multer";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/"); // Ensure the 'uploads' directory exists
	},
	filename: function (req, file, cb) {
		// Use the original file name or generate a new one and append .mp3
		const extension = file.mimetype === "audio/mp3" ? ".mp3" : "";
		cb(null, file.fieldname + "-" + Date.now() + extension);
	},
});

const upload = multer({ storage: storage });
const router = express.Router();

router.get("/currentUser", getCurrentUserByToken);
router.get("/summary", getFinancialSummary);
router.post("/audio-to-text", upload.single("audio"), getTextFromAudio);

export default router;
