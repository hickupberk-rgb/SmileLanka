export const User = require("../Models/userModel.js");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email, phone });
    }

    res.json({
      userId: user._id,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};