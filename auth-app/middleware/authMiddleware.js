const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  // 🔐 Check if header exists
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  // 🔐 Extract token safely
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  if (!token) {
    return res.status(401).json({ msg: "Token missing, access denied" });
  }

  try {
    // 🔓 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👤 Attach user data to request
    req.user = decoded;

    next();

  } catch (err) {
    console.log("JWT Error:", err.message);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};