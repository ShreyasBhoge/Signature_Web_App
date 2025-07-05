import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import axios from "axios";

function SignPage() {
  const { token } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyAndFetch = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/public/verify", { token });
        setPdfUrl(`/uploads/${res.data.filename}`);
      } catch (err) {
        console.error("Link verify error:", err.message);
        setError("⚠️ Invalid or expired signature link.");
      }
    };

    verifyAndFetch();
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Public Signature Page</h2>

      {error && <p className="text-red-600">{error}</p>}

      {!error && pdfUrl && (
        <div className="border shadow rounded">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfUrl} />
          </Worker>
        </div>
      )}
    </div>
  );
}

export default SignPage;
