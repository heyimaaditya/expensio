import asyncHandler from "../middleware/asyncHandler.js";
import Income from "../models/Income.js";

// all routes are private uless mentioned otherwise

// POST @ /income/add
const addIncome = async (req, res) => {
	try {
		const {
			title,
			description,
			amount,
			source,
			isRecurring,
			recurringType,
			date,
		} = req.body;
		const userId = req.user._id;

		const incomeData = {
			userId,
			title,
			description,
			amount,
			source,
			isRecurring: isRecurring || false,
			recurringType,
			date: date ? new Date(date) : new Date(),
		};

		const newIncome = new Income(incomeData);

		await newIncome.save();
		if (goal) {
			await Goal.updateOne(
				{ _id: goal._id },
				{ $push: { income: newIncome._id } }
			); // Add income to goal's income array
		}

		res.status(201).json({
			success: true,
			message: "Income added successfully",
			data: newIncome,
		});
	} catch (error) {
		console.error("Error adding income:", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

// GET @ /income?search=salary&amountStart=1000&amountEnd=5000&recurringType=monthly&startDate=2024-01-01&endDate=2024-03-31
const getIncome = async (req, res) => {
	try {
		const userId = req.user._id;
		const {
			search,
			amountStart,
			amountEnd,
			recurringType,
			startDate,
			endDate,
			id,
			goalId,
		} = req.query;

		let query = { userId };

		// If ID provided simply return the particular income
		if (id) {
			const income = await Income.findOne({ _id: id, userId });
			if (!income) {
				return res
					.status(404)
					.json({ success: false, message: "Income not found" });
			}
			return res.status(200).json({ success: true, data: income });
		}

		if (search) {
			query.title = { $regex: new RegExp(search, "i") };
		}
		if (amountStart !== undefined) {
			query.amount = { $gte: parseFloat(amountStart) };
		}
		if (amountEnd !== undefined) {
			query.amount = { ...query.amount, $lte: parseFloat(amountEnd) };
		}
		if (
			recurringType &&
			["weekly", "monthly", "yearly"].includes(recurringType)
		) {
			query.recurringType = recurringType;
		}
		if (startDate) {
			query.date = { ...query.date, $gte: new Date(startDate) };
		}
		if (endDate) {
			query.date = { ...query.date, $lte: new Date(endDate) };
		}
		if (goalId) {
			query.goalId = goalId;
		}

		const incomes = await Income.find(query);

		res.status(200).json({ success: true, data: incomes });
	} catch (error) {
		console.error("Error getting income:", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export { addIncome, getIncome };
