const User = require("../models/User");
const sendWelcomeEmail = require("../utils/mailer");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password
    });

    // 🔥 SEND EMAIL AFTER USER CREATION
    try {
      await sendWelcomeEmail(email, name);
    } catch (emailErr) {
      console.log("Email failed but user created:", emailErr.message);
    }

    res.json({
      message: "User created successfully",
      user
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { signup };