import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected : ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn("MongoDB unavailable, continuing with fallback storage:", error.message);
    return null;
  }
};

export default connectDB;