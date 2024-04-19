import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 50,
		},
		description: {
			type: String,
			maxlength: 500,
		},
		maxSpend: {
			type: Number,
			validate: {
				validator: function (v) {
					return v != null || this.minIncome != null;
				},
				message: "Either maxSpend or minIncome must be provided",
			},
		},
		minIncome: {
			type: Number,
			validate: {
				validator: function (v) {
					return v != null || this.maxSpend != null;
				},
				message: "Either maxSpend or minIncome must be provided",
			},
		},
		type: {
			type: String,
			required: true,
			enum: ["income", "spend", "both"],
		},
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
		progress: {
			type: Number,
			required: true,
			min: 0,
			max: 100,
		},
		expenses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Expense",
			},
		],
		income: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Income",
			},
		],
		priority: {
			type: String,
			required: true,
			enum: ["low", "medium", "high"],
		},
		status: {
			type: String,
			required: true,
			enum: ["inProgress", "achieved", "delayed"],
		},
	},
	{ timestamps: true }
);

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
