import React from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  if (!token) {
    console.warn("🔐 Access denied. Redirecting to login.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
