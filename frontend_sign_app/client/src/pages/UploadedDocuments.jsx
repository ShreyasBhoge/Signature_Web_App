import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const UploadedDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  const API_BASE = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE}/api/documents`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDocuments(res.data);
      } catch (err) {
        setError("Failed to load documents.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, [API_BASE]);

  const getStatusColor = (status) => {
    return status === "Signed"
      ? "bg-green-100 text-green-700"
      : status === "Rejected"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";
  };

  const handleCopyLink = (filename) => {
    const url = `${API_BASE}/uploads/signed-${filename}`;
    navigator.clipboard.writeText(url);
    alert("✅ Link copied to clipboard:\n" + url);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE}/api/documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments((prev) => prev.filter((doc) => doc._id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("❌ Delete failed");
    }
  };

  const filteredDocs =
    filterStatus === "All"
      ? documents
      : documents.filter((doc) => doc.status === filterStatus);

  return (
    <>
      <Navbar hideExtras />
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-600">Uploaded Documents</h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded shadow text-sm"
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="mb-6">
          <label className="mr-2 font-medium text-gray-700">Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all hover:scale-105"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Signed">Signed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <ul className="space-y-4">
            <AnimatePresence>
              {filteredDocs.map((doc) => (
                <motion.li
                  key={doc._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white w-full max-w-xl mx-auto min-h-[180px] rounded-xl shadow-md border border-gray-200 p-8 transition-all duration-300 group hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-blue-400 relative"
                >
                  <div className="mb-4">
                    <h4
                      className="font-semibold truncate text-lg text-gray-800"
                      title={doc.originalname}
                    >
                      {doc.originalname}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Uploaded on {new Date(doc.uploadedAt).toLocaleString()}
                    </p>
                    <p className="text-sm mt-1 flex items-center gap-2">
                      <span className="font-semibold">Status:</span>
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(
                          doc.status
                        )}`}
                      >
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
                      href={`${API_BASE}/uploads/signed-${doc.filename}`}
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
        )}
      </div>
    </>
  );
};

export default UploadedDocuments;
