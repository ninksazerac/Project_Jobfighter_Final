import React from 'react'
import { Outlet } from "react-router-dom";
import CompanyRoute from "../../../components/routes/CompanyRoute"
function CompanyRoutes () {
  return (
    <div>
          <CompanyRoute>
        <Outlet />
        </CompanyRoute>
    </div>
  )
}

export default CompanyRoutes
