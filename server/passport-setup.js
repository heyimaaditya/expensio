import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import User from "./models/User.js";

import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google Profile:", profile); // clg
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
        }
        // console.log("Authenticated User:", user); //
        // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        // 	expiresIn: "1h",
        // });
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // console.log("Serializing user:", user); // Check what is being serialized
  if (!user) {
    console.error("No user object available for serialization");
    done(new Error("No user object available"), null);
  } else if (!user._id) {
    console.error("User object does not contain _id:", user);
    done(new Error("User object missing _id"), null);
  } else {
    done(null, user._id.toString());
  }
});

passport.deserializeUser((id, done) => {
  // console.log("Deserializing user by ID:", id); // Log to see the ID used for fetching
  User.findById(id)
    .then((user) => done(null, user))
    .catch((error) => done(error, null));
});
