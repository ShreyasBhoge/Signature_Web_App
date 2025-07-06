import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "../pdfWorker";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PublicSignPage = () => {
  const { token } = useParams();
  const [docData, setDocData] = useState(null);
  const [signature, setSignature] = useState("John Doe");
  const [font, setFont] = useState("cursive");
  const [signed, setSigned] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [coords, setCoords] = useState({ x: 100, y: 100 });
  const pdfWrapperRef = useRef(null);
  const API_BASE = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/sign/${token}`)
      .then((res) => {
        console.log("📄 Document data:", res.data);
        setDocData(res.data);
      })
      .catch((err) => {
        console.error("❌ Error fetching document:", err.message);
        alert("⚠️ Invalid or expired link");
      });
  }, [token, API_BASE]);

  const handleFinalize = async () => {
    try {
      await axios.post(`${API_BASE}/api/signatures/public-sign/finalize`, {
        token,
        name: signature,
        font,
        x: coords.x,
        y: coords.y,
        page: 1,
      });
      setSigned(true);
    } catch (err) {
      alert("❌ Failed to finalize signature.");
    }
  };

  if (!docData)
    return (
      <div className="text-center mt-20 text-gray-600 animate-pulse">
        Loading document...
      </div>
    );

  if (signed) {
    return (
      <motion.div
        className="text-center mt-20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          ✅ Document Signed Successfully!
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => (window.location.href = "/")}
        >
          Return Home
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <motion.h1
        className="text-3xl font-bold mb-6 text-blue-700"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Sign This Document
      </motion.h1>

      {/* PDF + Draggable Signature */}
      <motion.div
        ref={pdfWrapperRef}
        className="relative border shadow-xl rounded-lg overflow-auto max-w-[850px] max-h-[700px] bg-white"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Document
          file={`${API_BASE}/uploads/${docData.filename}`}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} width={800} />
          ))}
        </Document>

        {/* 🖋️ Draggable Signature */}
        <motion.div
          drag
          dragConstraints={pdfWrapperRef}
          className="absolute px-3 py-1 text-black bg-white rounded border border-blue-400 cursor-move shadow-md"
          style={{
            fontFamily: font,
            fontSize: "22px",
            top: coords.y,
            left: coords.x,
          }}
          onDragEnd={(event, info) => {
            const boundingBox = pdfWrapperRef.current?.getBoundingClientRect();
            if (boundingBox) {
              const x = info.point.x - boundingBox.left;
              const y = info.point.y - boundingBox.top;
              setCoords({ x, y });
              console.log("📌 Signature dropped at:", { x, y });
            }
          }}
        >
          {signature}
        </motion.div>
      </motion.div>

      {/* Signature Input + Font Preview */}
      <motion.div
        className="flex flex-col items-center gap-4 w-full max-w-md mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          placeholder="Type your name"
          className="border px-4 py-2 rounded w-full shadow-sm focus:ring-2 focus:ring-blue-300 transition"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
        />

        <select
          className="border px-4 py-2 rounded w-full shadow-sm focus:ring-2 focus:ring-blue-300 transition"
          value={font}
          onChange={(e) => setFont(e.target.value)}
        >
          <option value="cursive">Cursive</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
          <option value="sans-serif">Sans-Serif</option>
        </select>

        <motion.div
          className="text-center py-2 px-4 rounded bg-blue-50 w-full border"
          style={{ fontFamily: font, fontSize: "22px" }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {signature}
        </motion.div>

        <motion.button
          onClick={handleFinalize}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:shadow-xl transition hover:bg-blue-700"
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          🖋️ Finalize Signature
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PublicSignPage;
