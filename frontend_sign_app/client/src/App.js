import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Register from "./pages/Register";
import PublicSignPage from "./pages/PublicSignPage";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import DocumentList from "./pages/DocumentList";
import PDFPreview from "./pages/PDFPreview";
import UploadedDocuments from "./pages/UploadedDocuments";

// Components
import RequireAuth from "./components/RequireAuth";

// Toast Notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🏠 Public Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* 🔐 Authenticated Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DocumentList />
            </RequireAuth>
          }
        />
        <Route
          path="/preview/:filename"
          element={
            <RequireAuth>
              <PDFPreview />
            </RequireAuth>
          }
        />

        {/* 🔓 Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sign/:token" element={<PublicSignPage />} />
        <Route path="/documents" element={<UploadedDocuments />} />
      </Routes>

      {/* ✅ Global Toast UI */}
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
