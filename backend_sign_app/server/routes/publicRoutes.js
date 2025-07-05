const express = require("express");
const jwt = require("jsonwebtoken");
const Document = require("../models/Document");

const router = express.Router();

// POST /api/public/verify
router.post("/verify", async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const document = await Document.findById(decoded.documentId);

    if (!document) return res.status(404).json({ message: "Document not found" });

    res.json({ filename: document.filename });
  } catch (err) {
    console.error("Token verify error:", err.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;
