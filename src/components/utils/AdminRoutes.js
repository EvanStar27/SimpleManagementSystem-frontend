import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const AdminRoutes = () => {
  return localStorage.getItem('token') &&
    localStorage.getItem('role') === 'ROLE_ADMIN' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  )
}

export default AdminRoutes
