import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import axios from "axios";

function SignPage() {
  const { token } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);

  const API_BASE = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const verifyAndFetch = async () => {
      try {
        const res = await axios.post(`${API_BASE}/api/public/verify`, { token });
        setPdfUrl(`${API_BASE}/uploads/${res.data.filename}`);
      } catch (err) {
        console.error("Link verify error:", err.message);
        setError("⚠️ Invalid or expired signature link.");
      }
    };

    verifyAndFetch();
  }, [token, API_BASE]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-700 text-center">
        🖋️ Public Signature Page
      </h2>

      {error && (
        <p className="text-red-600 text-center text-base sm:text-lg max-w-md">
          {error}
        </p>
      )}

      {!error && !pdfUrl && (
        <p className="text-gray-500 animate-pulse text-center">Loading PDF...</p>
      )}

      {!error && pdfUrl && (
        <div className="w-full max-w-5xl border rounded shadow bg-white overflow-auto">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfUrl} />
          </Worker>
        </div>
      )}
    </div>
  );
}

export default SignPage;
