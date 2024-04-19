import asyncHandler from "../middleware/asyncHandler.js";
import Expense from "../models/Expense.js";
import Category from "../models/Category.js";
import PsychologicalType from "../models/PsychologicalType.js";
import User from "../models/User.js";
import Goal from "../models/Goal.js";
// import axios from "axios";

//************************************Routes START************************************//  all private unless mentioned otherwise

// PRIVATE: GET @ /expense/test
const expenseTest = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `ROUTE expenseTest IS WORKING` });
});

//PRIVATE: POST @ /expense/add
const addExpense = asyncHandler(async (req, res) => {
	const {
		title,
		amount,
		categoryCode,
		dateTime,
		event,
		psychologicalTypeCode,
		description,
		notes,
		image,
		paymentMethod,
		mood,
		goalId,
	} = req.body;
	const userId = req.user._id;

	try {
		if (!title || !amount || !categoryCode) {
			return res
				.status(400)
				.json({ message: "Title, amount, and category are required." });
		}

		const category = await Category.findOne({ code: categoryCode });
		if (!category) {
			return res.status(400).json({ message: "Invalid category code." });
		}

		let psychologicalType = null;
		if (psychologicalTypeCode) {
			psychologicalType = await PsychologicalType.findOne({
				code: psychologicalTypeCode,
			});
			if (!psychologicalType) {
				return res
					.status(400)
					.json({ message: "Invalid psychological type code." });
			}
		}

		let goal = null;

		if (goalId) {
			goal = await Goal.findById(goalId);
			if (!goal) {
				return res.status(400).json({ message: "Invalid goal ID." });
			}
		}

		const newExpense = new Expense({
			userId,
			title,
			amount,
			category: category._id,
			dateTime: dateTime || new Date(),
			event,
			psychologicalType: psychologicalType ? psychologicalType._id : undefined,
			description,
			notes,
			image,
			paymentMethod,
			mood: mood || "neutral",
			goal: goal ? goal._id : undefined,
		});

		await newExpense.save();

		if (goal) {
			await Goal.updateOne(
				{ _id: goal._id },
				{ $push: { expenses: newExpense._id } }
			); // add expense to Goal's expenses array
		}

		res.status(201).json({
			message: `Expense ${goal && "and goal"} added successfully!`,
			expense: newExpense,
		});
	} catch (error) {
		console.error("Failed to add expense:", error);
		res
			.status(500)
			.json({ message: "Failed to add expense due to internal server error." });
	}
});

//PRIVATE: GET @ /expense?start_date=2023-01-01&end_date=2023-01-31&search=office&categoryCode=financialServices&psychologicalTypeCode=impulseBuy&event=60aff925-ba3e-4b0c-91a9-7fcb145e4c31&mood=happy&page=1&pageSize=10
const getExpenses = async (req, res) => {
	const {
		start_date,
		end_date,
		search,
		event,
		categoryCode,
		psychologicalTypeCode,
		mood,
		page,
		pageSize,
		id,
		goalId,
	} = req.query;

	// If ID provided, return specific expense
	if (id) {
		try {
			const expense = await Expense.findById(id).populate(
				"category event psychologicalType"
			);
			if (!expense) {
				return res.status(404).json({ message: "Expense not found." });
			}
			return res.status(200).json(expense);
		} catch (error) {
			return res.status(400).json({ message: "Invalid ID format." });
		}
	}

	try {
		// Fetch category and psychologicalType by codes
		const category = categoryCode
			? await Category.findOne({ code: categoryCode })
			: null;
		const psychologicalType = psychologicalTypeCode
			? await PsychologicalType.findOne({ code: psychologicalTypeCode })
			: null;

		let query = {};

		if (req.user && req.user._id) {
			query.userId = req.user._id;
		} else {
			return res.status(403).json({ message: "User authentication required." });
		}

		if (start_date || end_date) {
			query.dateTime = {};
			if (start_date) {
				query.dateTime.$gte = new Date(start_date);
			}
			if (end_date) {
				query.dateTime.$lte = new Date(end_date);
			}
		}

		if (search) {
			query.$or = [
				{ title: { $regex: search, $options: "i" } },
				{ description: { $regex: search, $options: "i" } },
			];
		}

		if (event) {
			query.event = event;
		}

		if (category) {
			query.category = category._id;
		}

		if (psychologicalType) {
			query.psychologicalType = psychologicalType._id;
		}

		if (mood) {
			query.mood = mood;
		}
		if (goalId) {
			query.goalId = goalId;
		}
		const limit = parseInt(pageSize) || 20; // Default pageSize 20
		const skip = ((parseInt(page) || 1) - 1) * limit; // Default page 1

		const expenses = await Expense.find(query)
			.populate("category event psychologicalType")
			.sort({ dateTime: -1 }) // date descending order
			.skip(skip)
			.limit(limit);

		const total = await Expense.countDocuments(query);

		res.status(200).json({
			expenses,
			total,
			page: parseInt(page) || 1,
			pages: Math.ceil(total / limit),
		});
	} catch (error) {
		console.error("Error fetching expenses:", error);
		res.status(500).json({
			message: "Error fetching expenses due to internal server error.",
		});
	}
};

export { getExpenses, expenseTest, addExpense };
