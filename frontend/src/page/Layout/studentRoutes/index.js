import React from 'react'
import { Outlet } from "react-router-dom";
import StudentRoute from "../../../components/routes/StudentRoute"
function StudentRoutes() {
  return (
    <div>
      <StudentRoute>
        <Outlet />
        </StudentRoute>
    </div>
  )
}

export default StudentRoutes
