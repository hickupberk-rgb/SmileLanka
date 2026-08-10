import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "Sri Lanka",
  },
  bio: {
    type: String,
    default: "",
  },
  wishlist: {
    type: [Object],
    default: [],
  },
  recentlyViewed: {
    type: [Object],
    default: [],
  },
  reviews: {
    type: [Object],
    default: [],
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;