require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ================= ROUTES =================
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/postRoutes");

// register routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

// ================= DEBUG ENV =================
console.log("MONGO_URI:", process.env.MONGO_URI);

// ================= DB CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    // test DB connection
    const test = await mongoose.connection.db.admin().ping();
    console.log("DB Ping Result:", test);
  })
  .catch((err) => {
    console.log("MongoDB Error:", err.message);
  });

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.json({
    message: "API is running 🚀"
  });
});

// ================= SERVER START =================
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});