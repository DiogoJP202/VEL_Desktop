import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    logout();
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
