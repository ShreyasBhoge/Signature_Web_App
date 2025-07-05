const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express(); // ✅ Initialize app BEFORE using it

// ✅ Load Document model (correct path)
const Document = require("./models/Document"); // ⬅️ FIXED path here

// ✅ Middleware
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const signRoutes = require("./routes/signRoutes");
const publicRoutes = require("./routes/publicRoutes");
const auditRoutes = require("./routes/auditRoutes");

// ✅ Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/sign", signRoutes);       // /generate-token, /:token etc
app.use("/api/public", publicRoutes);
app.use("/api/audit", auditRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🟢 API is working!");
});

// ✅ Connect to MongoDB
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Mongo Error:", err);
  });
