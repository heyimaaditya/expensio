import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 50,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    amount: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      maxlength: 50,
    },
    isRecurring: {
      type: Boolean,
      required: true,
      default: false,
    },
    recurringType: {
      type: String,
      enum: ["weekly", "monthly", "yearly"],
    },
    date: {
      type: Date,
      required: true,
    },
    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
    },
  },
  { timestamps: true }
);

const Income = mongoose.model("Income", incomeSchema);

export default Income;
