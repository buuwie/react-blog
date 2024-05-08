import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function AdminPrivateRoute() {
  const {currentUser} = useSelector((state) => state.user)
  const location = useLocation();
  return currentUser && currentUser.isAdmin ? <Outlet /> : <Navigate to='/' state={{ error: "Bạn không có quyền truy cập" }}/>
}
