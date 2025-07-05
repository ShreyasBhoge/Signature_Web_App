const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },
  signedBy: {
    type: String, // Could be "Guest" or user ID/email
    required: true,
  },
  signedAt: {
    type: Date,
    default: Date.now,
  },
  ipAddress: String,
});

module.exports = mongoose.model("Audit", auditSchema);

