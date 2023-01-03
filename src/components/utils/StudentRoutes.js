import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const StudentRoutes = () => {
  return localStorage.getItem("token") &&
    localStorage.getItem("role") === "ROLE_STUDENT" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default StudentRoutes;
