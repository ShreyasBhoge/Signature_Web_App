import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/Footer";
import SignatureShowcase from "../components/SignatureShowcase";
import { motion, AnimatePresence } from "framer-motion";

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in again.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/documents", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDocuments(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching documents:", err.message);
        setError("Error fetching documents. Check console for details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments((prev) => prev.filter((doc) => doc._id !== id));
    } catch (err) {
      console.error("Delete error:", err.message);
      setError("Delete failed.");
    }
  };

  const handleCopyLink = (filename) => {
    const url = `http://localhost:5000/uploads/signed-${filename}`;
    navigator.clipboard.writeText(url);
    alert("✅ Link copied to clipboard:\n" + url);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("❌ Only PDF files are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/documents/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Document uploaded successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Upload error:", err.message);
      alert("❌ Upload failed. See console for details.");
    } finally {
      setUploading(false);
    }
  };

  const filteredDocs =
    filterStatus === "All"
      ? documents
      : documents.filter((doc) => doc.status === filterStatus);

  const displayedDocs = filteredDocs.slice(0, 2);

  const getStatusColor = (status) => {
    return status === "Signed"
      ? "bg-green-100 text-green-700"
      : status === "Rejected"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";
  };

  return (
    <>
    <Navbar
  onLogout={handleLogout}
  filterStatus={filterStatus}
  setFilterStatus={setFilterStatus}
/>


      <div className="p-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
          Upload Document
        </h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className={`mx-auto max-w-md bg-white rounded-full p-8 border-4 border-dotted transition-all duration-300 mb-10 cursor-pointer relative overflow-hidden group text-center ${
            uploading ? "animate-pulse" : ""
          }`}
          style={{
            borderColor: "transparent",
            borderImage:
              "linear-gradient(270deg, red, orange, yellow, green, blue, indigo, violet) 1",
          }}
          onClick={() => document.getElementById("pdfUpload").click()}
        >
          <p className="text-lg font-medium text-gray-700">
            {uploading ? "Uploading..." : "📎 Click or drag a PDF file to upload"}
          </p>
          <input
            id="pdfUpload"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleUpload}
          />
        </motion.div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading documents...</div>
        ) : filteredDocs.length === 0 ? (
          <p className="text-gray-500 text-center">No documents match the selected status.</p>
        ) : (
          <>
            <ul className="space-y-4">
              <AnimatePresence>
                {displayedDocs.map((doc) => (
                  <motion.li
                    key={doc._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-white w-full max-w-xl mx-auto min-h-[180px] rounded-xl shadow-md border border-gray-200 p-8 transition-all duration-300 group hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-blue-400 relative"
                  >
                    <div className="mb-4">
                      <h4 className="font-semibold truncate text-lg text-gray-800" title={doc.originalname}>
                        {doc.originalname}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Uploaded on {new Date(doc.uploadedAt).toLocaleString()}
                      </p>
                      <p className="text-sm mt-1 flex items-center gap-2">
                        <span className="font-semibold">Status:</span>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(doc.status)}`}>
                          {doc.status || "Pending"}
                        </span>
                        {doc.status === "Rejected" && doc.rejectionReason && (
                          <span className="italic text-sm text-red-500">
                            ({doc.rejectionReason})
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out mt-4 flex flex-wrap justify-center gap-2 pointer-events-none group-hover:pointer-events-auto">
                      <Link
                        to={`/preview/${doc.filename}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm shadow-sm transition duration-200"
                      >
                        View
                      </Link>
                      <a
                        href={`http://localhost:5000/uploads/signed-${doc.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm shadow-sm transition duration-200"
                      >
                        Download
                      </a>
                      <button
                        onClick={() => handleCopyLink(doc.filename)}
                        className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm shadow-sm transition duration-200"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => handleDelete(doc._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm shadow-sm transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            {filteredDocs.length > 2 && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => navigate("/documents")}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium transition-all"
                >
                  See More →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <FeatureSection />
      <SignatureShowcase />
      <Footer />
    </>
  );
};

export default DocumentList;
