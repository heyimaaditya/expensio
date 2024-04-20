import asyncHandler from "../middleware/asyncHandler.js";
import PsychologicalType from "../models/PsychologicalType.js";

const getPsychologicalTypes = asyncHandler(async (req, res) => {
  try {
    const psychologicalTypes = await PsychologicalType.find({});
    res.status(200).json({ psychologicalTypes });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { getPsychologicalTypes };
