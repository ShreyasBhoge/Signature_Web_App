const Document = require("../models/Document");
const crypto = require("crypto"); // for token generation

// 📁 Upload a document
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const signingToken = crypto.randomBytes(16).toString("hex");

    const newDoc = await Document.create({
      filename: req.file.filename,
      originalname: req.file.originalname,
      uploadedBy: req.user.id,
      signingToken,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      document: newDoc,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// 📄 Get all documents for the logged-in user
exports.getDocuments = async (req, res) => {
  try {
    // 🧾 Debug log for req.user
    console.log("📥 [getDocuments] req.user:", req.user);

    if (!req.user || !req.user.id) {
      console.log("❌ No req.user.id found in token");
      return res.status(400).json({ message: "Invalid or missing user ID" });
    }

    const documents = await Document.find({ uploadedBy: req.user.id }).sort({ uploadedAt: -1 });
    console.log(`📦 Found ${documents.length} documents for user ${req.user.id}`);
    res.json(documents);
  } catch (error) {
    console.error("❌ Fetch error in getDocuments:", error.message);
    res.status(500).json({ message: "Failed to fetch documents" });
  }
};

// ✍️ Save signature coordinates (x, y)
exports.saveSignature = async (req, res) => {
  const { id } = req.params;
  const { x, y } = req.body;

  try {
    const updatedDoc = await Document.findByIdAndUpdate(
      id,
      { signature: { x, y } },
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json({ message: "Signature position saved", document: updatedDoc });
  } catch (err) {
    console.error("Error saving signature:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
