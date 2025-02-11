import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectDb } from "./Models & utils/db.js";
import User from "./Models & utils/authModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cookieParser());

// Allow requests from your frontend
const corsOptions = {
  origin: "http://localhost:3000",  // Replace with the exact URL of your frontend
  credentials: true,  // Allow cookies and authentication headers
};
app.use(cors(corsOptions));

// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt; // Get the token from cookies

  if (!token) return res.sendStatus(401); // No token found

  jwt.verify(token, process.env.SecretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user; // Attach user information to request
    next(); // Proceed to the next middleware or route handler
  });
};

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("All fields are required");
  }

  try {
    const UserData = await User.findOne({ email });
    if (!UserData) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, UserData.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: UserData.id, email: UserData.email }, process.env.SecretKey, { expiresIn: "1h" });

    // Set the JWT token in an HTTP-only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
      sameSite: "strict", // CSRF protection
      maxAge: 3600000, // 1 hour
    });

    return res.status(200).json({
      message: "You are Logged In",
      Data: {
        userId: UserData.id,
        email: UserData.email,
      },
    });
  } catch (error) {
    console.log("Error from Login", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Register Route
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("All fields are required");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json({
      message: "User registered successfully",
      data: {
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("Error from Register", error);
    return res.status(500).send("Internal Server Error");
  }
});
app.post("/api/logout", (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
  });
  return res.status(200).json({ message: "You have been logged out successfully" });
});

app.get("/api/user", authenticateToken, (req, res) => {
  res.json({ email: req.user.email });
});
app.get("/",(req,res)=>{
  res.send('Hello Welcome to PPP Server')
})
app.listen(5000, () => {
  ConnectDb();
  console.log("Listening on Port:5000");
});

