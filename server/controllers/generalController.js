import asyncHandler from "../middleware/asyncHandler.js";
import Expense from "../models/Expense.js";
import { openaiApi, openaiApiSummary } from "../utils/openai.js";
import { userSummaryPrompt } from "../data/aiPrompts.js";

const getCurrentUserByToken = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

const getFinancialSummary = async (req, res) => {
	try {
		const userId = req.user._id;

		const categoryDetails = await Expense.aggregate([
			{ $match: { userId } },
			{
				$group: {
					_id: "$category",
					totalSpent: { $sum: "$amount" },
					averageSpentPerTransaction: { $avg: "$amount" },
					numberOfTransactions: { $sum: 1 },
				},
			},
		]);

		const psychologicalTypeDetails = await Expense.aggregate([
			{ $match: { userId } },
			{
				$group: {
					_id: "$psychologicalType",
					totalSpent: { $sum: "$amount" },
					averageSpentPerTransaction: { $avg: "$amount" },
					numberOfTransactions: { $sum: 1 },
				},
			},
		]);

		const moodDetails = await Expense.aggregate([
			{ $match: { userId } },
			{
				$group: {
					_id: "$mood",
					totalSpent: { $sum: "$amount" },
					numberOfTransactions: { $sum: 1 },
				},
			},
		]);

		const overallSpendingDetails = await Expense.aggregate([
			{ $match: { userId } },
			{
				$group: {
					_id: null,
					totalSpent: { $sum: "$amount" },
					averageSpentPerTransaction: { $avg: "$amount" },
					totalNumberOfTransactions: { $sum: 1 },
				},
			},
		]);

		const financialSummary = {
			overallSpending: overallSpendingDetails[0],
			spendingByCategory: categoryDetails,
			spendingByPsychologicalType: psychologicalTypeDetails,
			spendingByMood: moodDetails,
		};

		console.log(financialSummary);

		const summaryString = JSON.stringify(financialSummary);
		const fullPrompt = userSummaryPrompt + " " + summaryString;
		const summaryMarkdown = await openaiApiSummary(fullPrompt);

		res.json({
			success: true,
			markdown: summaryMarkdown,
			summaryData: financialSummary,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to retrieve financial summary",
			error: error.message,
		});
	}
};

export { getCurrentUserByToken, getFinancialSummary };
