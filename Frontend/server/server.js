import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import User from "./Models/userModel.js";
import CustomTour from "./Models/customTourModel.js";
dotenv.config();

const app = express();
const PORT = 5000;

// middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));

app.use(express.json());
app.get("/check-user", async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ exists: false });
    }

    return res.json({
      exists: true,
      user,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});



/* ---------------- REGISTER USER ---------------- */
app.post("/register", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    console.log("REGISTER REQUEST:", req.body);

    const newUser = await User.create({
      name,
      email,
      phone,
    });

    console.log("USER SAVED:", newUser);

    res.json({
      userId: newUser._id,
      user: newUser,
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ---------------- BOOKING ---------------- */
app.post("/book", async (req, res) => {
  try {
    const { userId, service, date, guests } = req.body;

    console.log("BOOK REQUEST:", req.body);

    if (!userId || !service || !date || !guests) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const user = await User.findById(userId).lean();

    if (!user) {
      return res.status(404).json({
        error: "User not found in DB (maybe deleted or wrong ID)",
      });
    }

    const booking = {
      _id: new mongoose.Types.ObjectId(),
      userId,
      service,
      date,
      guests,
      createdAt: new Date(),
    };

    res.json({
      success: true,
      booking,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("BOOK ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
/* ---------------- CUSTOM TOUR REQUEST ---------------- */
app.post("/custom-tour", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      travelDates,
      duration,
      interests,
      budget,
      groupSize,
      specialRequests,
    } = req.body;

    // save to DB
    const request = await CustomTour.create({
      name,
      email,
      phone,
      travelDates,
      duration,
      interests,
      budget,
      groupSize,
      specialRequests,
    });

    res.json({
      success: true,
      requestId: request._id,
      message: "Custom tour request saved",
    });

  } catch (error) {
    console.error("CUSTOM TOUR ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ---------------- START SERVER ONLY AFTER DB ---------------- */
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});