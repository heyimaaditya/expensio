import Goal from "../models/Goal.js";

const addGoal = async (req, res) => {
	// console.log("reached controller addGoal");
	try {
		const {
			name,
			description,
			maxSpend,
			minIncome,
			type,
			startDate,
			endDate,
			priority,
		} = req.body;
		console.log(priority);
		// Validate required fields
		if (!name || !type || !startDate || !endDate) {
			return res.status(400).json({
				success: false,
				message: "Name, type, startDate and endDate are required.",
			});
		}
		if (!maxSpend && !minIncome) {
			return res.status(400).json({
				success: false,
				message:
					"At least one of the fields: minimum income or maximum expense, is required",
			});
		}
		// if (
		// 	priority &&
		// 	(priority !== "low" || priority !== "medium" || priority !== "high")
		// ) {
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "Invalid priority value. It can be 'low', 'medium' or 'high'.",
		// 	});
		// }

		const newGoal = new Goal({
			name,
			description,
			maxSpend,
			minIncome,
			type,
			startDate: new Date(startDate),
			endDate: new Date(endDate),
			progress: 0,
			priority: priority ? priority : "medium",
			status: "inProgress",
		});

		// Save the goal
		await newGoal.save();

		res.status(201).json({
			success: true,
			message: "Goal added successfully",
			data: newGoal,
		});
	} catch (error) {
		console.error("Error adding goal:", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export { addGoal };
