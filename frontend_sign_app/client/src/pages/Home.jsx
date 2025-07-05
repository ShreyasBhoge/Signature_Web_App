import React, { useState } from "react";
import { FaFilePdf, FaChevronDown, FaChevronUp } from "react-icons/fa";


const Home = () => {
  const [files, setFiles] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  const toggleShow = () => setShowAll(!showAll);

  const visibleFiles = showAll ? files : files.slice(0, 2);

  return (
    <section className="bg-gradient-to-br from-purple-100 to-pink-100 min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Upload PDFs to Sign</h1>
        <p className="text-gray-600 mb-6">Easily upload, preview, and sign your documents online.</p>

        {/* Upload Box */}
        <div className="border-dashed border-2 border-purple-400 rounded-lg p-6 mb-6 transition hover:shadow-lg bg-purple-50">
          <label
            htmlFor="fileUpload"
            className="block text-purple-600 cursor-pointer font-semibold"
          >
            📄 Drag & Drop PDFs here or <span className="underline">Browse</span>
          </label>
          <input
            type="file"
            id="fileUpload"
            multiple
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Uploaded Files */}
        {files.length > 0 && (
          <div className="mt-4 text-left">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Uploaded Files</h2>
            <ul className="space-y-2">
              {visibleFiles.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md shadow-sm"
                >
                  <FaFilePdf className="text-red-500" />
                  <span className="truncate">{file.name}</span>
                </li>
              ))}
            </ul>

            {files.length > 2 && (
              <button
                onClick={toggleShow}
                className="mt-3 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition"
              >
                {showAll ? (
                  <>
                    Show Less <FaChevronUp />
                  </>
                ) : (
                  <>
                    See More <FaChevronDown />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
