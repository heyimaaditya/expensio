import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
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
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		budget: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
