const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  originalname: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  signature: {
    name: {
      type: String,
      default: "",
    },
    font: {
      type: String,
      default: "cursive",
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 1,
    },
  },
  signingToken: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Signed", "Rejected"],
    default: "Pending",
  },
  rejectionReason: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Document", documentSchema);
