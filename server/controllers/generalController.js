import asyncHandler from "../middleware/asyncHandler.js";

const getCurrentUserByToken = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

export { getCurrentUserByToken };
