import asyncHandler from "../middleware/asyncHandler";
import User from "../models/User";
import jwt from "jsonwebtoken";

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Return user directly instead of nesting it under the key "user"
  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;

    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the user by userId
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fields to update
    const fieldsToUpdate = [
      "name",
      "image",
      "email",
      "phone",
      "occupation",
      "location",
      "budget",
    ];

    // Update user data based on req.body
    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "User updated successfully", data: user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;

    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the user by userId
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { getUser, updateUser, deleteUser };

// const updateUser = asyncHandler(async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const { name, image, email, phone, occupation, location, budget } =
//       req.body;

//     // Ensure userId is provided
//     if (!userId) {
//       return res.status(400).json({ message: "User ID is required" });
//     }

//     // Find the user by userId
//     const user = await User.findById(userId);

//     // Check if user exists
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Update user data based on req.body
//     if (name) {
//       user.name = name;
//     }
//     if (image) {
//       user.image = image;
//     }
//     if (email) {
//       user.email = email;
//     }
//     if (phone) {
//       user.phone = phone;
//     }
//     if (occupation) {
//       user.occupation = occupation;
//     }
//     if (location) {
//       user.location = location;
//     }
//     if (budget) {
//       user.budget = budget;
//     }

//     // Save the updated user
//     await user.save();

//     res.status(200).json({ message: "User updated successfully", data: user });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
