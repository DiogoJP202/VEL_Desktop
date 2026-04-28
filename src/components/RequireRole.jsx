import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function RequireRole({ children, allowedRoles = [], fallbackPath = "/login" }) {
  const location = useLocation();
  const { role } = useAuth();

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to={fallbackPath} replace state={{ from: location }} />;
  }

  return children;
}
