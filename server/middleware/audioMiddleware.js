import multer from "multer";
import asyncHandler from "./asyncHandler.js";

const upload = multer({ storage: multer.memoryStorage() });

const audioUploadMiddleware = asyncHandler(async (req, res, next) => {
	upload.single("audio");
	next();
});

export default audioUploadMiddleware;
