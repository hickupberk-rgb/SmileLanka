const Booking = require("../models/Booking");
const mongoose = require("mongoose");

exports.createBooking = async (req, res) => {
  try {
    const { userId, service, date, guests } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const booking = await Booking.create({
      userId,
      service,
      date,
      guests,
    });

    res.json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};