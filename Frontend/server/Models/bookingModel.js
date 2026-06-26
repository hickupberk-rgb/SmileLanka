import User from "./models/User.js";
import Booking from "./models/Booking.js";

app.post("/book", async (req, res) => {
  try {
    const { userId, service, date, guests } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        error: "Invalid user ID",
        received: userId,
      });
    }

    const booking = await Booking.create({
      userId,
      service,
      date,
      guests,
    });

    res.json({
      bookingId: booking._id,
      message: "Booking confirmed",
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});