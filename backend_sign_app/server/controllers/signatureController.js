import jwt from "jsonwebtoken";
import Document from "../models/Document.js";
import { sendSignatureEmail } from "../utils/sendEmail.js";

// 📩 Send Public Signature Link via Email
export const sendPublicSignLink = async (req, res) => {
  const { email, documentId } = req.body;

  try {
    const token = jwt.sign(
      { email, documentId },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    await sendSignatureEmail(email, token);
    res.status(200).json({ success: true, message: "Link sent!" });
  } catch (err) {
    console.error("❌ Send Link Error:", err.message);
    res.status(500).json({ error: "Failed to send email." });
  }
};

// 🖋️ Finalize Signature via Public Token
export const finalizePublicSignature = async (req, res) => {
  const { token, name, font, x, y, page } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { documentId } = decoded;

    console.log("🔐 Decoded token:", decoded);
    console.log("🧾 Saving signature:", { name, font, x, y, page });

    const document = await Document.findById(documentId);
    if (!document) {
      console.error("❌ Document not found for ID:", documentId);
      return res.status(404).json({ message: "Document not found" });
    }

    document.signature = { name, font, x, y, page };
    document.status = "Signed";
    await document.save();

    console.log("✅ Signature finalized and saved for document:", documentId);

    res.json({ success: true, message: "Document signed successfully" });
  } catch (err) {
    console.error("❌ Finalize Signature Error:", err.message);
    res.status(500).json({ message: "Failed to finalize signature" });
  }
};
