const express = require("express");
const Audit = require("../models/Audit");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// GET /api/audit/:fileId → returns all logs for this document
router.get("/:fileId", verifyToken, async (req, res) => {
  try {
    const logs = await Audit.find({ documentId: req.params.fileId }).sort({ signedAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch audit logs" });
  }
});

module.exports = router;
