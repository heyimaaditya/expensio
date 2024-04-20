import mongoose, { Mongoose } from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    notes: {
      type: [String],
      validate: [
        (array) => array.length <= 10,
        "Array of notes should not exceed 10 elements",
      ],
      of: {
        type: String,
        maxlength: 300,
      },
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    psychologicalType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PsychologicalType",
    },
    image: {
      type: String,
      // required: true,
      maxlength: 300,
    },
    paymentMethod: {
      type: String,
      maxlength: 200,
    },
    mood: {
      type: String,
      enum: ["happy", "neutral", "regretful"],
      required: true,
      default: "neutral",
    },
    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
