import mongoose from "mongoose";

const customTourSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  travelDates: String,
  duration: String,
  interests: String,
  budget: String,
  groupSize: String,
  specialRequests: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("CustomTour", customTourSchema);