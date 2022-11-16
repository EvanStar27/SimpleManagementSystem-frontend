import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const GuestsRoutes = () => {
  return localStorage.getItem('token') &&
    localStorage.getItem('role') === 'ROLE_ADMIN' ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Outlet />
  )
}

export default GuestsRoutes
