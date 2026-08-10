import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import crypto from "crypto";
import { connectDB } from "./config/db.js";
import User from "./Models/userModel.js";
import CustomTour from "./Models/customTourModel.js";
import Booking from "./Models/bookingModel.js";
import Admin from "./Models/adminModel.js";
import AdminRegistrationRequest from "./Models/adminRegistrationRequestModel.js";
dotenv.config();

const app = express();
const PORT = 5000;
const fallbackStorage = {
  admins: [],
  adminRegistrationRequests: [],
  users: [],
  bookings: [],
  customTours: [],
};

const isDbReady = () => mongoose.connection.readyState === 1;
const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const ensureDatabaseConnection = async () => {
  if (isDbReady()) {
    return true;
  }

  try {
    await connectDB();
    if (isDbReady()) {
      return true;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return isDbReady();
  } catch (error) {
    console.error("DATABASE CONNECTION ATTEMPT FAILED:", error.message);
    return false;
  }
};
const hashPassword = (password) => crypto.createHash("sha256").update(password).digest("hex");
const hashRegistrationToken = (token) => crypto.createHash("sha256").update(token).digest("hex");
const createAdminToken = (admin) => crypto.createHash("sha256").update(`${admin.email}:${admin.password}:${admin.role}`).digest("hex");
const comparePassword = (inputPassword, storedPassword) => {
  if (!inputPassword || !storedPassword) {
    return false;
  }

  return inputPassword === storedPassword || hashPassword(inputPassword) === storedPassword;
};
const sanitizeAdmin = (admin) => ({
  id: admin.id || admin._id,
  name: admin.name,
  email: admin.email,
  role: admin.role,
});
const getAdminByToken = async (token) => {
  if (!token) {
    return null;
  }

  if (isDbReady()) {
    const adminsFromDb = await Admin.find({}, "name email password role").lean();
    return adminsFromDb.find((admin) => createAdminToken(admin) === token) || null;
  }

  return fallbackStorage.admins.find((admin) => createAdminToken(admin) === token) || null;
};
const requireAdminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers["x-admin-token"];
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

  if (!token) {
    return res.status(401).json({ error: "Admin access required" });
  }

  const admin = await getAdminByToken(token);
  if (!admin) {
    return res.status(403).json({ error: "Invalid admin session" });
  }

  req.admin = sanitizeAdmin(admin);
  next();
};
// middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options(/(.*)/, cors());

app.use(express.json());
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    database: isDbReady() ? "connected" : "fallback",
  });
});

app.get("/check-user", async (req, res) => {
  try {
    const { email } = req.query;

    if (!isDbReady()) {
      const user = fallbackStorage.users.find((item) => item.email === email);
      return res.json({ exists: Boolean(user), user: user || null });
    }

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



/* ---------------- ADMIN AUTH ---------------- */
app.get("/admin/exists", async (req, res) => {
  try {
    const dbReady = await ensureDatabaseConnection();
    const exists = dbReady
      ? (await Admin.countDocuments().catch(() => 0)) > 0
      : fallbackStorage.admins.length > 0;

    res.json({ exists });
  } catch (error) {
    console.error("ADMIN EXISTS ERROR:", error);
    res.status(500).json({ error: "Unable to check admin setup" });
  }
});

app.post("/admin/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const dbReady = await ensureDatabaseConnection();
    const existingAdmin = dbReady
      ? await Admin.findOne({ email: normalizedEmail }).lean()
      : fallbackStorage.admins.find((admin) => admin.email === normalizedEmail);

    if (existingAdmin) {
      return res.status(409).json({ error: "An admin account already exists with this email." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = hashRegistrationToken(token);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    if (!dbReady) {
      fallbackStorage.adminRegistrationRequests.push({
        id: createId(),
        name: name.trim(),
        email: normalizedEmail,
        phone: phone?.trim() || "Not provided",
        password: hashPassword(password),
        tokenHash,
        expiresAt,
      });
    } else {
      await AdminRegistrationRequest.deleteMany({ email: normalizedEmail });
      await AdminRegistrationRequest.create({
        name: name.trim(),
        email: normalizedEmail,
        phone: phone?.trim() || "Not provided",
        password: hashPassword(password),
        tokenHash,
        expiresAt,
      });
    }

    const serverUrl = process.env.PUBLIC_SERVER_URL || `http://localhost:${PORT}`;
    const confirmationLink = `${serverUrl}/admin/register/confirm?token=${token}`;

    res.json({
      success: true,
      pending: true,
      confirmationLink,
      message: "Registration request created. Sending the approval message now.",
    });
  } catch (error) {
    console.error("ADMIN REGISTER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/admin/register/confirm", async (req, res) => {
  try {
    const { token } = req.query;
    if (!token || typeof token !== "string") {
      return res.status(400).send("Invalid registration confirmation link.");
    }

    const tokenHash = hashRegistrationToken(token);
    const dbReady = await ensureDatabaseConnection();
    const request = dbReady
      ? await AdminRegistrationRequest.findOne({ tokenHash })
      : fallbackStorage.adminRegistrationRequests.find((item) => item.tokenHash === tokenHash);

    if (!request || new Date(request.expiresAt) < new Date()) {
      return res.status(400).send("This registration request is invalid or has expired.");
    }

    const existingAdmin = dbReady
      ? await Admin.findOne({ email: request.email })
      : fallbackStorage.admins.find((admin) => admin.email === request.email);

    if (existingAdmin) {
      return res.status(409).send("An admin account already exists with this email.");
    }

    const admin = dbReady
      ? await Admin.create({ name: request.name, email: request.email, password: request.password, role: "admin" })
      : {
          id: createId(),
          name: request.name,
          email: request.email,
          password: request.password,
          role: "admin",
        };

    if (!dbReady) {
      fallbackStorage.admins.push(admin);
      fallbackStorage.adminRegistrationRequests = fallbackStorage.adminRegistrationRequests.filter((item) => item.tokenHash !== tokenHash);
    } else {
      await AdminRegistrationRequest.deleteOne({ _id: request._id });
    }

    res.send("Admin registration confirmed successfully. The new admin can now sign in.");
  } catch (error) {
    console.error("ADMIN REGISTRATION CONFIRMATION ERROR:", error);
    res.status(500).send("Unable to confirm admin registration.");
  }
});

app.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const dbReady = await ensureDatabaseConnection();

    if (!dbReady) {
      const admin = fallbackStorage.admins.find((item) => item.email === normalizedEmail);
      if (!admin || !comparePassword(password, admin.password)) {
        return res.status(401).json({ error: "Invalid admin credentials" });
      }

      return res.json({ success: true, token: createAdminToken(admin), admin: sanitizeAdmin(admin) });
    }

    const admin = await Admin.findOne({ email: normalizedEmail });
    if (!admin || !comparePassword(password, admin.password)) {
      return res.status(401).json({ error: "Invalid admin credentials" });
    }

    res.json({
      success: true,
      token: createAdminToken(admin),
      admin: sanitizeAdmin(admin),
    });
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ---------------- REGISTER USER ---------------- */
const sanitizeUser = (user) => {
  if (!user) {
    return null;
  }

  const safeUser = { ...user };
  delete safeUser.password;
  safeUser.id = safeUser._id || safeUser.id;
  return safeUser;
};

app.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }

    const trimmedName = String(name).trim();
    const normalizedEmail = String(email).trim().toLowerCase();
    const trimmedPassword = String(password).trim();

    if (!/^[A-Za-z][A-Za-z\s'.-]*$/.test(trimmedName)) {
      return res.status(400).json({ error: "Full name cannot contain numbers or special characters." });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    if (trimmedPassword.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }

    const dbReady = await ensureDatabaseConnection();

    if (!dbReady) {
      const existingUser = fallbackStorage.users.find((item) => item.email?.toLowerCase() === normalizedEmail);
      if (existingUser) {
        return res.status(409).json({ error: "User already exists with this email." });
      }

      const user = {
        _id: createId(),
        name: trimmedName,
        email: normalizedEmail,
        phone: phone || "",
        password: hashPassword(trimmedPassword),
        profileImage: "",
        country: "Sri Lanka",
        bio: "",
        wishlist: [],
        recentlyViewed: [],
        reviews: [],
      };
      fallbackStorage.users.push(user);
      return res.json({ userId: user._id, user: sanitizeUser(user) });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists with this email." });
    }

    const newUser = await User.create({
      name: trimmedName,
      email: normalizedEmail,
      phone: phone || "",
      password: hashPassword(trimmedPassword),
      profileImage: "",
      country: "Sri Lanka",
      bio: "",
      wishlist: [],
      recentlyViewed: [],
      reviews: [],
    });

    res.json({
      userId: newUser._id,
      user: sanitizeUser(newUser.toObject ? newUser.toObject() : newUser),
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const dbReady = await ensureDatabaseConnection();

    if (!dbReady) {
      const user = fallbackStorage.users.find((item) => item.email?.toLowerCase() === normalizedEmail);
      if (!user || !comparePassword(password, user.password)) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      return res.json({ success: true, user: sanitizeUser(user) });
    }

    const user = await User.findOne({ email: normalizedEmail }).lean();
    if (!user || !comparePassword(password, user.password)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({ success: true, user: sanitizeUser(user) });
  } catch (error) {
    console.error("USER LOGIN ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dbReady = await ensureDatabaseConnection();

    if (!dbReady) {
      const user = fallbackStorage.users.find((item) => item._id === id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json({ user: sanitizeUser(user) });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    const user = await User.findById(id).lean();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user: sanitizeUser(user) });
  } catch (error) {
    console.error("GET USER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

app.patch("/user/:id/profile", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, country, bio, profileImage } = req.body;

    const dbReady = await ensureDatabaseConnection();

    const updateData = {};
    if (name) updateData.name = name.trim();
    if (email) updateData.email = String(email).trim().toLowerCase();
    if (phone !== undefined) updateData.phone = phone || "";
    if (country !== undefined) updateData.country = country || "Sri Lanka";
    if (bio !== undefined) updateData.bio = bio || "";
    if (profileImage !== undefined) updateData.profileImage = profileImage || "";

    if (!dbReady) {
      const userIndex = fallbackStorage.users.findIndex((item) => item._id === id);
      if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
      }

      fallbackStorage.users[userIndex] = {
        ...fallbackStorage.users[userIndex],
        ...updateData,
      };

      return res.json({ user: sanitizeUser(fallbackStorage.users[userIndex]) });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true }).lean();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user: sanitizeUser(user) });
  } catch (error) {
    console.error("UPDATE USER PROFILE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

app.patch("/user/:id/reviews", async (req, res) => {
  try {
    const { id } = req.params;
    const { review } = req.body;

    if (!review || typeof review !== "object") {
      return res.status(400).json({ error: "Review data is required" });
    }

    const normalizedReview = {
      id: review.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      author: String(review.author || "").trim(),
      rating: Number(review.rating) || 0,
      note: String(review.note || "").trim(),
      createdAt: review.createdAt || new Date().toISOString(),
    };

    if (!normalizedReview.author || !normalizedReview.note || normalizedReview.rating < 1 || normalizedReview.rating > 5) {
      return res.status(400).json({ error: "Review must include author, note, and a rating between 1 and 5" });
    }

    const dbReady = await ensureDatabaseConnection();

    if (!dbReady) {
      const userIndex = fallbackStorage.users.findIndex((item) => item._id === id);
      if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
      }

      fallbackStorage.users[userIndex].reviews = fallbackStorage.users[userIndex].reviews || [];
      fallbackStorage.users[userIndex].reviews.unshift(normalizedReview);

      return res.json({ success: true, reviews: fallbackStorage.users[userIndex].reviews });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $push: { reviews: { $each: [normalizedReview], $position: 0 } } },
      { new: true }
    ).lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true, reviews: user.reviews || [] });
  } catch (error) {
    console.error("UPDATE USER REVIEWS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

app.patch("/user/:id/password", async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password || String(password).trim().length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }

    const dbReady = await ensureDatabaseConnection();

    if (!dbReady) {
      const userIndex = fallbackStorage.users.findIndex((item) => item._id === id || item.id === id);
      if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
      }

      fallbackStorage.users[userIndex].password = hashPassword(String(password).trim());
      return res.json({ success: true, user: sanitizeUser(fallbackStorage.users[userIndex]) });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    const user = await User.findByIdAndUpdate(id, { password: hashPassword(String(password).trim()) }, { new: true }).lean();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true, user: sanitizeUser(user) });
  } catch (error) {
    console.error("UPDATE USER PASSWORD ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ---------------- BOOKING ---------------- */
const getBookingPayload = (booking) => ({
  ...booking,
  id: booking._id || booking.id,
  user: booking.userId || null,
});

const getUserBookings = async (identifier) => {
  const normalized = String(identifier || "").trim();

  if (!normalized) {
    return { user: null, bookings: [] };
  }

  const dbReady = await ensureDatabaseConnection();

  if (!dbReady) {
    const user = fallbackStorage.users.find((item) =>
      item._id === normalized || item.email?.toLowerCase() === normalized.toLowerCase()
    ) || null;

    const bookings = user
      ? fallbackStorage.bookings.filter((booking) => booking.userId === user._id)
      : [];

    return {
      user,
      bookings: bookings.map((booking) => ({
        ...booking,
        id: booking._id || booking.id,
        user: user ? { id: user._id, name: user.name, email: user.email } : null,
      })),
    };
  }

  let user = null;
  if (mongoose.Types.ObjectId.isValid(normalized)) {
    user = await User.findById(normalized).lean();
  } else {
    user = await User.findOne({ email: normalized.toLowerCase() }).lean();
  }

  if (!user) {
    return { user: null, bookings: [] };
  }

  const bookings = await Booking.find({ userId: user._id }).populate("userId", "name email phone").sort({ createdAt: -1 }).lean();

  return {
    user,
    bookings: bookings.map((booking) => ({
      ...booking,
      id: booking._id || booking.id,
      user: booking.userId || null,
    })),
  };
};

app.get("/user/email/:email/bookings", async (req, res) => {
  try {
    const { email } = req.params;
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!normalizedEmail) {
      return res.status(400).json({ error: "Email is required" });
    }

    const { user, bookings } = await getUserBookings(normalizedEmail);

    if (!user) {
      return res.status(404).json({ error: "No user found for this email" });
    }

    res.json({ user, bookings });
  } catch (error) {
    console.error("USER BOOKINGS BY EMAIL ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/user/:identifier/bookings", async (req, res) => {
  try {
    const { identifier } = req.params;
    const { user, bookings } = await getUserBookings(identifier);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user, bookings });
  } catch (error) {
    console.error("USER BOOKINGS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/book", async (req, res) => {
  try {
    const { userId, service, date, guests } = req.body;

    console.log("BOOK REQUEST:", req.body);

    if (!userId || !service || !date || !guests) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const dbReady = await ensureDatabaseConnection();

    if (!dbReady) {
      const user = fallbackStorage.users.find((item) => item._id === userId) || null;
      if (!user) {
        return res.status(404).json({ error: "User not found in fallback storage" });
      }

      const booking = {
        _id: createId(),
        userId,
        service,
        date,
        guests,
        amount: 0,
        status: "Pending",
        createdAt: new Date(),
      };
      fallbackStorage.bookings.push(booking);
      return res.json({ success: true, booking, user: { id: user._id, name: user.name, email: user.email } });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const user = await User.findById(userId).lean();

    if (!user) {
      return res.status(404).json({
        error: "User not found in DB (maybe deleted or wrong ID)",
      });
    }

    const priceMap = {
      "Cultural Triangle Explorer": 999,
      "Hill Country Retreat": 899,
      "Beach Paradise Getaway": 1299,
      "Wildlife Safari Adventure": 1499,
      "Southern Coast Explorer": 1199,
      "Ultimate Sri Lanka Experience": 2499,
    };

    const booking = await Booking.create({
      userId,
      service,
      date,
      guests,
      amount: (priceMap[service] || 0) * Number(guests || 1),
      status: "Pending",
    });

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

app.patch("/admin/bookings/:id/status", requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowedStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid booking status" });
    }

    if (!isDbReady()) {
      const bookingIndex = fallbackStorage.bookings.findIndex((item) => item._id === id || item.id === id);
      if (bookingIndex === -1) {
        return res.status(404).json({ error: "Booking not found" });
      }

      fallbackStorage.bookings[bookingIndex] = {
        ...fallbackStorage.bookings[bookingIndex],
        status,
      };

      return res.json({ success: true, booking: fallbackStorage.bookings[bookingIndex] });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }

    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true })
      .populate("userId", "name email phone")
      .lean();

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ success: true, booking: { ...booking, user: booking.userId || null } });
  } catch (error) {
    console.error("UPDATE BOOKING STATUS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/admin/bookings", requireAdminAuth, async (req, res) => {
  try {
    if (!isDbReady()) {
      return res.json({ bookings: fallbackStorage.bookings });
    }

    const bookings = await Booking.find().populate("userId", "name email phone").sort({ createdAt: -1 }).lean();
    res.json({
      bookings: bookings.map((booking) => ({
        ...booking,
        user: booking.userId || null,
      })),
    });
  } catch (error) {
    console.error("ADMIN BOOKINGS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/admin/stats", requireAdminAuth, async (req, res) => {
  try {
    if (!isDbReady()) {
      const bookings = fallbackStorage.bookings;
      const total = bookings.length;
      const confirmed = bookings.filter((booking) => booking.status === "Confirmed").length;
      const pending = bookings.filter((booking) => booking.status === "Pending").length;
      const revenue = bookings.reduce((sum, booking) => sum + (booking.amount || 0), 0);

      return res.json({
        stats: {
          total,
          confirmed,
          pending,
          revenue,
        },
      });
    }

    const bookings = await Booking.find().lean();
    const total = bookings.length;
    const confirmed = bookings.filter((booking) => booking.status === "Confirmed").length;
    const pending = bookings.filter((booking) => booking.status === "Pending").length;
    const revenue = bookings.reduce((sum, booking) => sum + (booking.amount || 0), 0);

    res.json({
      stats: {
        total,
        confirmed,
        pending,
        revenue,
      },
    });
  } catch (error) {
    console.error("ADMIN STATS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

app.patch("/admin/custom-tours/:id/status", requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowedStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid custom tour status" });
    }

    if (!isDbReady()) {
      const customTourIndex = fallbackStorage.customTours.findIndex((item) => item._id === id || item.id === id);
      if (customTourIndex === -1) {
        return res.status(404).json({ error: "Custom tour request not found" });
      }

      fallbackStorage.customTours[customTourIndex] = {
        ...fallbackStorage.customTours[customTourIndex],
        status,
      };

      return res.json({ success: true, customTour: fallbackStorage.customTours[customTourIndex] });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid custom tour ID" });
    }

    const customTour = await CustomTour.findByIdAndUpdate(id, { status }, { new: true }).lean();
    if (!customTour) {
      return res.status(404).json({ error: "Custom tour request not found" });
    }

    res.json({ success: true, customTour });
  } catch (error) {
    console.error("UPDATE CUSTOM TOUR STATUS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/admin/custom-tours", requireAdminAuth, async (req, res) => {
  try {
    if (!isDbReady()) {
      return res.json({ customTours: (fallbackStorage.customTours || []).map((request) => ({
        ...request,
        status: request.status || "Pending",
      })) });
    }

    const customTours = await CustomTour.find().sort({ createdAt: -1 }).lean();
    res.json({
      customTours: customTours.map((request) => ({
        ...request,
        status: request.status || "Pending",
      })),
    });
  } catch (error) {
    console.error("ADMIN CUSTOM TOURS ERROR:", error);
    res.status(500).json({ error: error.message });
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

    if (!isDbReady()) {
      const request = {
        _id: createId(),
        name,
        email,
        phone,
        travelDates,
        duration,
        interests,
        budget,
        groupSize,
        specialRequests,
        status: "Pending",
        createdAt: new Date(),
      };

      fallbackStorage.customTours.push(request);
      return res.json({
        success: true,
        requestId: request._id,
        message: "Custom tour request saved",
      });
    }

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
      status: "Pending",
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

/* ---------------- START SERVER ---------------- */
connectDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});