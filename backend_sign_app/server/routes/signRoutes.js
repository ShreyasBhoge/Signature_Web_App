const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Document = require("../models/Document");
const { sendSignatureEmail } = require("../utils/sendEmail");
const {
  sendPublicSignLink,
  finalizePublicSignature,
} = require("../controllers/signatureController");

// 👉 CHANGE THIS ONE LINE when you want to point to a different doc
const DEFAULT_DOCUMENT_ID = "6867bfbf31216d80b4336d3c"; // ✅ valid Mongo _id

//--------------------------------------------------------------------
// 1) Send public‑signing link via email
//--------------------------------------------------------------------
router.post("/send-link", sendPublicSignLink);

//--------------------------------------------------------------------
// 2) Finalize signature from public page
//--------------------------------------------------------------------
router.post("/public-sign/finalize", finalizePublicSignature);

//--------------------------------------------------------------------
// 3) Send test email (debug token + email send)
//--------------------------------------------------------------------
router.get("/test-email", async (req, res) => {
  try {
    const token = jwt.sign(
      { email: "test@example.com", documentId: DEFAULT_DOCUMENT_ID },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    console.log("📧  Test‑email token:", token);
    await sendSignatureEmail("shreyasbhoge7888@gmail.com", token);
    res.send("✅ Test email sent!");
  } catch (err) {
    console.error("❌ Test email error:", err.message);
    res.status(500).send("❌ Failed to send test email");
  }
});

//--------------------------------------------------------------------
// 4) Generate token manually (debug log)
//--------------------------------------------------------------------
router.get("/generate-token", (req, res) => {
  try {
    const token = jwt.sign(
      { email: "test@example.com", documentId: DEFAULT_DOCUMENT_ID },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    console.log("🧾 Generated token:", token);
    res.json({ token });
  } catch (err) {
    console.error("❌ Token generation error:", err.message);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

//--------------------------------------------------------------------
// 5) Public route to fetch document via token (with logs)
//--------------------------------------------------------------------
router.get("/:token", async (req, res) => {
  const { token } = req.params;
  console.log("📥 Received token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded token payload:", decoded);

    const { documentId } = decoded;
    console.log("🔎 Looking for document ID:", documentId);

    const document = await Document.findById(documentId);
    console.log("📄 Document result:", document);

    if (!document) {
      console.warn("⚠️ Document not found for ID:", documentId);
      return res.status(404).json({ message: "Document not found" });
    }

    res.json({
      _id: document._id,
      filename: document.filename,
      originalname: document.originalname,
      signature: document.signature || null,
    });
  } catch (err) {
    console.error("❌ Token verify error:", err.message);
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;
