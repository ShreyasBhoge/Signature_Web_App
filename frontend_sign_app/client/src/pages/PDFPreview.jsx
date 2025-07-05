import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PDFPreview = () => {
  const { filename } = useParams();
  const navigate = useNavigate();

  const [docId, setDocId] = useState(null);
  const [signatureText, setSignatureText] = useState("Alice Smith");
  const [font, setFont] = useState("Courier");
  const [fontSize, setFontSize] = useState(20);
  const [signaturePos, setSignaturePos] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [finalizedPath, setFinalizedPath] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/documents", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const doc = res.data.find((d) => d.filename === filename);
      if (doc) {
        setDocId(doc._id);
        if (doc.signature) setSignaturePos(doc.signature);
      } else {
        toast.error("❌ Document not found");
      }
    };
    fetchDocument();
  }, [filename]);

  useEffect(() => {
    const handleWindowMouseMove = (e) => {
      if (!isDragging) return;
      const container = document.getElementById("pdf-container");
      const bounds = container.getBoundingClientRect();
      const x = e.clientX - bounds.left - offset.x;
      const y = e.clientY - bounds.top - offset.y;
      setSignaturePos({ x, y });
    };

    const handleWindowMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleWindowMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [isDragging, offset]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = e.target.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!docId || !signaturePos) return toast.error("❌ Missing data");
    try {
      await axios.post(
        `http://localhost:5000/api/documents/${docId}/sign`,
        { x: signaturePos.x, y: signaturePos.y },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("✅ Signature saved!");
    } catch {
      toast.error("❌ Save failed");
    }
  };

  const handleFinalize = async () => {
    const token = localStorage.getItem("token");
    if (!docId || !signaturePos) return toast.error("❌ Missing data");

    const container = document.getElementById("pdf-container");
    const containerWidth = container?.clientWidth || 700;
    const containerHeight = container?.clientHeight || 700;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/documents/finalize",
        {
          filename,
          documentId: docId,
          signature: {
            text: signatureText,
            x: signaturePos.x,
            y: signaturePos.y,
            page: 0,
            font,
            size: fontSize,
            containerWidth,
            containerHeight,
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("🎉 Finalized!");
      setFinalizedPath(res.data.path);
    } catch {
      toast.error("❌ Finalization failed");
    }
  };

  const handleReject = async () => {
    const token = localStorage.getItem("token");
    const reason = prompt("Why reject?");
    if (!reason) return;

    try {
      await axios.post(
        `http://localhost:5000/api/documents/${docId}/reject`,
        { reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.warn("🚫 Rejected");
      navigate("/dashboard");
    } catch {
      toast.error("❌ Reject failed");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <ToastContainer position="top-center" />
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">📝 Sign Document</h1>
          <div className="flex gap-2">
            <button onClick={() => navigate("/dashboard")} className="btn">← Back</button>
            {signaturePos && (
              <>
                <button onClick={handleSave} className="btn bg-green-100 text-green-800">💾 Save</button>
                <button onClick={handleFinalize} className="btn bg-blue-100 text-blue-800">✅ Finalize</button>
              </>
            )}
            <button onClick={handleReject} className="btn bg-red-100 text-red-800">❌ Reject</button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input value={signatureText} onChange={(e) => setSignatureText(e.target.value)} placeholder="Signature" className="input" />
          <select value={font} onChange={(e) => setFont(e.target.value)} className="input">
            <option value="Courier">Courier</option>
            <option value="Helvetica">Helvetica</option>
            <option value="TimesRoman">Times Roman</option>
          </select>
          <input type="number" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="input" />
        </div>

        {/* PDF Viewer */}
        <div id="pdf-container" className="relative h-[700px] border rounded shadow bg-gray-100 overflow-hidden">
          <iframe
            src={`http://localhost:5000/uploads/${filename}`}
            title="PDF Viewer"
            width="100%"
            height="700px"
            className="w-full rounded"
          />
          {signaturePos && (
            <div
              onMouseDown={handleMouseDown}
              style={{
                position: "absolute",
                left: signaturePos.x,
                top: signaturePos.y,
                fontFamily: font,
                fontSize: fontSize,
                cursor: "grab",
                color: "#2e7d32",
              }}
              className="hover:scale-105 transition"
            >
              {signatureText}
            </div>
          )}
        </div>

        {/* Final PDF View Link */}
        {finalizedPath && (
          <div className="flex justify-end">
            <a
              href={`http://localhost:5000/uploads/${finalizedPath}?t=${Date.now()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-purple-100 text-purple-800"
            >
              📄 View Final PDF
            </a>
          </div>
        )}
      </div>

      {/* Tailwind Helpers */}
      <style>{`
        .btn {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          border-radius: 0.375rem;
          background-color: #f1f5f9;
          color: #333;
          transition: all 0.2s;
        }
        .btn:hover {
          background-color: #e2e8f0;
        }
        .input {
          padding: 0.5rem 0.75rem;
          border: 1px solid #ccc;
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
};

export default PDFPreview;
