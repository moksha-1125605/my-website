const nodemailer = require("nodemailer");

// transporter (Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// send email function
const sendWelcomeEmail = async (email, name) => {
  try {
    await transporter.sendMail({
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Our App 🎉",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2 style="color: #4CAF50;">Welcome, ${name} 👋</h2>
          <p>Thank you for joining our platform!</p>
          <p>We are excited to have you onboard.</p>
          <hr/>
          <p style="font-size: 12px;">This is an automated email.</p>
        </div>
      `
    });

    console.log("Welcome email sent");
  } catch (err) {
    console.log("Email error:", err.message);
  }
};

module.exports = sendWelcomeEmail;