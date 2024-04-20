//PREFIX ROUTE "/"
import express from "express";
import expenseRoutes from "./expense.js";
import incomeRoutes from "./income.js";
import goalRoutes from "./goal.js";
import generalRoutes from "./general.js";
import categoryRoutes from "./category.js";
import eventRoutes from "./event.js";
import psychologicalTypeRoutes from "./psychologicalTypes.js";
import { authorizeUser } from "../middleware/authMiddleware.js";

const mainRouter = express.Router();

// generalRouter.use("/auth", authRoutes); //prefix "/"
// generalRouter.use("/userdata", authorizeUser, userDataRoutes);
mainRouter.use("/expense", authorizeUser, expenseRoutes);
mainRouter.use("/income", authorizeUser, incomeRoutes);
mainRouter.use("/goal", authorizeUser, goalRoutes);
mainRouter.use("/category", authorizeUser, categoryRoutes);
mainRouter.use("/event", authorizeUser, eventRoutes);
mainRouter.use("/psycho-types", authorizeUser, psychologicalTypeRoutes);

mainRouter.use("/general", authorizeUser, generalRoutes);

export { mainRouter };
