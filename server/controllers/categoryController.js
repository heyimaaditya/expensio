import asyncHandler from "../middleware/asyncHandler.js";
import Category from "../models/Category.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const categoryTest = async (req, res) => {
  res.status(200).json({ test: "successful" });
};

export { getAllCategories, categoryTest };
