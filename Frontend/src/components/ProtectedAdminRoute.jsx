import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const SESSION_KEY = "smilelanka_admin_session";

const isAdminSessionValid = () => {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    return Boolean(session?.email && session?.role === "admin");
  } catch (error) {
    return false;
  }
};

const ProtectedAdminRoute = () => {
  return isAdminSessionValid() ? <Outlet /> : <Navigate to="/admin/auth" replace />;
};

export default ProtectedAdminRoute;
