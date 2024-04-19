import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

// google auth imports
import passport from "passport";
import session from "express-session";
import jwt from "jsonwebtoken";

import "./passport-setup.js";

import { mainRouter } from "./routes/main.js";
// import {
// 	addCategories,
// 	addPsychologicalTypes,
// } from "./data/insertFunctions.js";

// CONFIGURATION
const app = express();
app.use(express.json());

app.use(
  session({
    secret: process.env.JWT_SECRET, // Use a strong secret in production
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Google Auth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect to front end with token.
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.redirect(`http://localhost:3000?token=${token}`);
  }
);

// Middleware to attach user to req.user
app.use((req, res, next) => {
  req.user = req.isAuthenticated() ? req.session.passport.user : null;
  next();
});

app.use(cookieParser());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/", mainRouter);

//Connecting to database
const PORT = process.env.PORT || 3011;
connectDB();

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);

  /* Add data insertion functions below */
  /* WARNING: Comment them and move them out of app.listen after one time insertion.*/
});

// addPsychologicalTypes();
// addCategories();
