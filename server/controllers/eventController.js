import Event from "../models/Event.js";

const addEvent = async (req, res) => {
  try {
    const userId = req.user._id;

    const { name, description, startDate, endDate, budget } = req.body;
    if (!name || !startDate || !endDate || !budget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    if (new Date(startDate) >= new Date(endDate)) {
      return res
        .status(400)
        .json({ message: "Start date must be smaller than end date" });
    }

    if (Number(budget) <= 0) {
      return res
        .status(400)
        .json({ message: "Budget must be a positive number" });
    }

    const event = new Event({
      name,
      description,
      startDate,
      endDate,
      budget: Number(budget),
      userId,
    });

    await event.save();

    return res
      .status(201)
      .json({ message: "Event created successfully", event });
  } catch (error) {
    // Handle errors
    console.error("Error adding event:", error);
    if (error.name === "ValidationError") {
      // Mongoose validation error
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: errors.join(", ") });
    }
    // Other errors
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user._id });
    res.status(200).json({ events });
  } catch (error) {
    console.error("Error fetching Events:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export { addEvent, getAllEvents };
