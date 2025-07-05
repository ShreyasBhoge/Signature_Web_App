const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");

const {
  uploadDocument,
  getDocuments,
  saveSignature,
} = require("../controllers/documentController");

const verifyToken = require("../middleware/verifyToken");
const Document = require("../models/Document");
const Audit = require("../models/Audit");

const router = express.Router();

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

/* ------------------------- ROUTES ------------------------- */

// Upload
router.post("/upload", verifyToken, upload.single("file"), uploadDocument);

// Get all documents
router.get("/", verifyToken, getDocuments);

// Delete document
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Document.findByIdAndDelete(id);
    res.json({ message: "Document deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

// Save signature (drag/drop only, no finalizing)
router.post("/:id/sign", verifyToken, saveSignature);

// Finalize signature
router.post("/finalize", verifyToken, async (req, res) => {
  try {
    const { filename, documentId, signature } = req.body;
    const {
      text = "Signed",
      x = 100,
      y = 100,
      page = 0,
      font = "Courier",
      size = 20,
      containerWidth = 700,
      containerHeight = 700,
    } = signature;

    const filePath = path.join(__dirname, "..", "uploads", filename);
    const existingPdfBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const targetPage = pages[page] || pages[0];
    const { width, height } = targetPage.getSize();

    // Convert DOM units to PDF coordinates
    let scaledX = (x / containerWidth) * width;
    let scaledY = (y / containerHeight) * height;

    // Adjust Y for PDF coordinate system
    if (height > 300) {
      scaledY = height - scaledY - size;
    }

    scaledX += 10;
    scaledY -= 60;

    const safeX = Math.min(Math.max(scaledX, 10), width - 100);
    const safeY = Math.min(Math.max(scaledY, 10), height - 10);

    // Embed selected font
    let selectedFont;
    switch (font) {
      case "Helvetica":
        selectedFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        break;
      case "TimesRoman":
        selectedFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        break;
      default:
        selectedFont = await pdfDoc.embedFont(StandardFonts.Courier);
        break;
    }

    targetPage.drawText(text, {
      x: safeX,
      y: safeY,
      size,
      font: selectedFont,
      color: rgb(0, 0.5, 0),
    });

    const signedPdfBytes = await pdfDoc.save();
    const signedFileName = "signed-" + filename;
    const signedPath = path.join(__dirname, "..", "uploads", signedFileName);
    fs.writeFileSync(signedPath, signedPdfBytes);

    // Update document (keep signature object intact)
    await Document.findByIdAndUpdate(documentId, {
      status: "Signed",
    });

    await Audit.create({
      documentId,
      signedBy: req.user?.id || "Guest",
      ipAddress: req.ip,
    });

    res.json({
      message: "✅ Typed signature finalized",
      path: signedFileName,
    });
  } catch (err) {
    console.error("❌ Finalize Error:", err.message);
    res.status(500).json({ error: "Failed to finalize typed signature" });
  }
});

// Reject document
router.post("/:id/reject", verifyToken, async (req, res) => {
  const { reason } = req.body;
  const { id } = req.params;

  try {
    const doc = await Document.findById(id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    await Document.findByIdAndUpdate(
      id,
      { status: "Rejected", rejectionReason: reason || "" },
      { new: true }
    );

    res.json({ message: "Document rejected" });
  } catch (err) {
    console.error("🔥 Reject route error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Generate public share link
router.get("/share/:id", verifyToken, async (req, res) => {
  try {
    const documentId = req.params.id;
    const token = jwt.sign({ documentId }, process.env.JWT_SECRET, { expiresIn: "2d" });
    const publicLink = `http://localhost:5173/sign/${token}`;
    res.json({ link: publicLink });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate public link" });
  }
});

module.exports = router;
