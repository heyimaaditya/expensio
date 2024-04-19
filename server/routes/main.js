//PREFIX ROUTE "/"
import express from "express";
import expenseRoutes from "./expense.js";
import incomeRoutes from "./income.js";
import goalRoutes from "./goal.js";
import { authorizeUser } from "../middleware/authMiddleware.js";

const mainRouter = express.Router();

// generalRouter.use("/auth", authRoutes); //prefix "/"
// generalRouter.use("/userdata", authorizeUser, userDataRoutes);
mainRouter.use("/expense", authorizeUser, expenseRoutes);
mainRouter.use("/income", authorizeUser, incomeRoutes);
mainRouter.use("/goal", authorizeUser, goalRoutes);

export { mainRouter };
